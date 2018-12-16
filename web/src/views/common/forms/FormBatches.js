import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { batchValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import getDictBatchType from '../../../queries/DictionaryQueries/getDictBatchType';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import convertDatetimeForm from '../../../functions/convertDatetimeForm';

const errorMap = {
  amount: false,
  desc: false,
  creationDate: false,
  batchType: false
};

export class FormBatches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      desc: '',
      creationDate: currentDate('dateTime'),
      batchType: {},
      grapeHarvestId: '1',
      errors: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSelect = (name, data) => event => {
    this.setState({
      [name]: data.find(record => record.nazwa === event.target.value)
    });
  };

  handleSubmit = () => {
    const { batchId, amount, desc, creationDate, batchType, grapeHarvestId, parentBatchId } = this.state;
    let dataObject = {
      batchId,
      amount: Number(amount),
      desc,
      creationDate,
      batchTypeId: batchType.idTypPartii,
      grapeHarvestId,
      parentBatchId
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, batchValidationKeys);
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
      let data = initState.Partie[0];
      this.setState({
        batchId: data.idPartie,
        amount: data.ilosc,
        desc: data.opis ? data.opis : '',
        creationDate: convertDatetimeForm(data.dataUtworzenia),
        batchType: data.typPartii,
        grapeHarvestId: data.winobranie ? data.winobranie.idWinobranie : null,
        parentBatchId: data.partie[0] ? data.partie[0].idPartie : null
      });
    }
  }

  render() {
    const { amount, desc, creationDate, batchType, errors } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.amount}
              required
              id="amount"
              label="Ilość"
              type={'number'}
              value={amount}
              margin="dense"
              onChange={this.handleChange('amount')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.desc}
              id="desc"
              label="Opis"
              value={desc}
              margin="dense"
              onChange={this.handleChange('desc')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.creationDate}
              required
              id="creationDate"
              label="Data utworzenia"
              type="datetime-local"
              value={creationDate}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('creationDate')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <Query query={getDictBatchType}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <TextField
                    fullWidth
                    error={errors.batchType}
                    required
                    id="batchType"
                    select
                    label="Typ partii"
                    placeholder="Typ partii"
                    value={batchType.nazwa ? batchType.nazwa : ''}
                    onChange={this.handleSelect('batchType', data.DictTypPartii)}
                    margin="dense"
                    variant={'outlined'}
                  >
                    {data.DictTypPartii.map(record => (
                      <MenuItem key={record.idTypPartii} value={record.nazwa}>
                        {record.nazwa}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            </Query>
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormBatches.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
