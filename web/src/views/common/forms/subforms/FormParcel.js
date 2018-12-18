import React from 'react';
import { TextField, Chip, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import currentDate from '../CurrentDate';
import DialogForForm from '../DialogForForm';
import StepperItemFromWarehouse from '../StepperItemFromWarehouse';
import PropTypes from 'prop-types';
import UniversalValidationHandler from '../UniversalValidationHandler/UniversalValidationHandler';
import { parcelValidationKeys } from '../UniversalValidationHandler/validationKeys/validationKeys';
import convertDatetimeForm from '../../../../functions/convertDatetimeForm';

const errorMap = {
  packageName: false,
  weight: false,
  date: false
};

export class FormParcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName: '',
      weight: '',
      date: currentDate('dateTime'),
      content: [],
      open: false,
      errors: errorMap
    };
  }

  validate() {
    const { packageName, weight, date } = this.state;

    let dataObject = { packageName, weight, date };

    let arrayOfErrors = UniversalValidationHandler(dataObject, parcelValidationKeys);
    if (arrayOfErrors.length === 0) {
      this.setState({ error: errorMap });
      return true;
    } else {
      let error = Object.assign({}, errorMap);
      for (let errorField in arrayOfErrors) {
        error[arrayOfErrors[errorField]] = true;
      }
      this.setState({ errors: error });
      return false;
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => {
        const { parcelId, packageName, weight, date, content } = this.state;
        const { varName } = this.props;
        this.props.onChange(varName, {
          parcelId,
          packageName,
          weight,
          date,
          content
        });
      }
    );
  };

  handleAddContent = data => {
    this.setState(
      prevState => ({
        content: [...prevState.content, data]
      }),
      () => {
        const { parcelId, packageName, weight, date, content } = this.state;
        const { varName } = this.props;
        this.props.onChange(varName, {
          parcelId,
          packageName,
          weight,
          date,
          content
        });
      }
    );
  };

  handleDelete = data => () => {
    this.setState(state => {
      const content = [...state.content];
      const contentToDelete = content.indexOf(data);
      content.splice(contentToDelete, 1);
      return { content };
    });
  };

  componentDidMount() {
    const { initState } = this.props;
    if (initState) {
      let data = initState.przesylka;
      let parcelJT = initState.PrzesylkaHasPozycjaWMagazynie;
      this.setState(
        {
          parcelId: data.idPrzesylka,
          packageName: data.nazwaPrzesylki,
          weight: data.ciezarLadunku,
          date: convertDatetimeForm(data.data),
          content: data.pozycjaWMagazynie.map(curr => ({
            parcelJTId: parcelJT ? this.initParcelJTId(parcelJT, curr.idPozycja) : '',
            key: curr.idPozycja,
            selectedItem: curr,
            amount: curr.iloscFromJoinTable
          }))
        },
        () => {
          const { parcelId, packageName, weight, date, content } = this.state;
          const { varName } = this.props;
          this.props.onChange(varName, {
            parcelId,
            packageName,
            weight,
            date,
            content
          });
        }
      );
    }
  }

  initParcelJTId = (data, searchedId) => {
    return data.find(JT => JT.przesylkaIdPrzesylka === searchedId).idPrzesylkaHasPozycjaWMagazynie;
  };

  render() {
    const { packageName, weight, date, open, errors, content } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={errors.packageName}
            required
            id="packageName"
            label="Nazwa przesyłki"
            placeholder="Nazwa przesyłki"
            value={packageName}
            margin="dense"
            onChange={this.handleChange('packageName')}
            variant={'outlined'}
            inputProps={{
              maxLength: '20'
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={errors.weight}
            required
            id="weight"
            label="Waga"
            placeholder="Waga"
            value={weight}
            margin="dense"
            type={'number'}
            onChange={this.handleChange('weight')}
            variant={'outlined'}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={errors.date}
            required
            id="date"
            label="Data odbioru/dostarczenia"
            type="datetime-local"
            value={date}
            InputLabelProps={{
              shrink: true
            }}
            margin="dense"
            onChange={this.handleChange('date')}
            variant={'outlined'}
          />
        </Grid>
        <Grid item md={12}>
          {this.state.content.map(data => {
            return (
              <Chip
                key={data.key}
                label={data.selectedItem.nazwa + ' ' + data.amount}
                onDelete={this.handleDelete(data)}
              />
            );
          })}
        </Grid>
        <Grid item md={12}>
          <Button variant="outlined" onClick={this.handleClickOpen}>
            Dodaj
          </Button>
          <DialogForForm
            title={'Magazyn'}
            open={open}
            onClose={this.handleClose}
            children={
              <StepperItemFromWarehouse onSubmit={this.handleAddContent} onClose={this.handleClose} content={content} />
            }
          />
        </Grid>
      </Grid>
    );
  }
}

FormParcel.propTypes = {
  varName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
