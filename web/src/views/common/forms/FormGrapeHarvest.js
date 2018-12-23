import React from 'react';
import { Grid, InputAdornment, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { harvestValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import DialogForForm from './DialogForForm';
import { Query } from 'react-apollo';
import getVineyards from '../../../queries/VineyardQueries/getVineyards';
import CircularProgress from '@material-ui/core/es/CircularProgress';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';

const errorMap = {
  dateOfHarvest: false,
  amount: false
};

export class FormGrapeHarvest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateOfHarvest: currentDate('date'),
      amount: 0,
      vineyard: '',
      open: false,
      errors: errorMap
    };
  }

  handleClickOpen = name => {
    this.setState({ [name]: true });
  };

  handleClose = name => {
    this.setState({ [name]: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSelectVineyard = (name, vineyard) => {
    this.setState({
      [name]: vineyard
    });
  };

  handleSubmit = () => {
    const { grapeHarvestId, dateOfHarvest, amount, vineyard } = this.state;
    let dataObject = {
      grapeHarvestId,
      dateOfHarvest,
      amount: Number(amount),
      vineyardId: vineyard.idWinnica,
      vineyardIdFK: vineyard.idWinnica
    };
    let arrayOfErrors = UniversalValidationHandler(dataObject, harvestValidationKeys);
    if (arrayOfErrors.length === 0) {
      this.props.onSubmit(this.props.mutation, dataObject);
    } else {
      let error = Object.assign({}, errorMap);
      for (let errorField in arrayOfErrors) {
        error[arrayOfErrors[errorField]] = true;
      }
      this.setState({ errors: error });
      this.props.submitAborted();
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  componentDidMount() {
    const { initState } = this.props;
    if (initState) {
      let data = initState.Winobranie[0];
      this.setState({
        grapeHarvestId: data.idWinobranie,
        dateOfHarvest: data.dataWinobrania,
        amount: data.iloscZebranychWinogron,
        vineyard: data.winnica ? data.winnica : ''
      });
    }
  }

  render() {
    const { dateOfHarvest, amount, vineyard, open, errors } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="vineyard"
              label="Winnica"
              value={vineyard ? vineyard.nazwa : 'Nie wybrano winnicy'}
              error={errors.vineyard}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={() => this.handleClickOpen('open')}
            />
            <DialogForForm title={'Winnice'} open={open} onClose={() => this.handleClose('open')}>
              <Query query={getVineyards}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return (
                    <SelectableAutoTable
                      queryData={data.Winnica}
                      // querySubject="Kontrahenci"
                      querySize={data.Winnica.length}
                      funParam="vineyard"
                      onSelect={this.handleSelectVineyard}
                      onClose={() => this.handleClose('open')}
                      id={vineyard ? vineyard.idWinnica : null}
                    />
                  );
                }}
              </Query>
            </DialogForForm>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.dateOfHarvest}
              required
              id="dateOfHarvest"
              label="Data zbioru"
              type="date"
              value={dateOfHarvest}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('dateOfHarvest')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.amount}
              required
              id="amount"
              label="Ilość"
              value={amount}
              type="number"
              margin="dense"
              onChange={this.handleChange('amount')}
              variant={'outlined'}
              InputProps={{
                startAdornment: <InputAdornment position="start">Kg</InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormGrapeHarvest.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
