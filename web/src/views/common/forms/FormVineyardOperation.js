import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { vineyardOperationsValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import { Query } from 'react-apollo';
import getDictVineyardOperations from '../../../queries/DictionaryQueries/getDictVineyardOperations';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import convertDatetimeForm from '../../../functions/convertDatetimeForm';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';
import DialogForForm from './DialogForForm';
import getVineyards from '../../../queries/VineyardQueries/getVineyards';

const errorMap = {
  dateOfOperation: false,
  desc: false,
  dictOperation: false
};

export class FormVineyardOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOfOperation: currentDate('dateTime'),
      desc: '',
      dictOperation: {},
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

  handleSelect = (name, data) => event => {
    this.setState({
      [name]: data.find(record => record.nazwa === event.target.value)
    });
  };

  handleSelectVineyard = (name, vineyard) => {
    this.setState({
      [name]: vineyard
    });
  };

  handleSubmit = () => {
    const { vineyardOperationId, dateOfOperation, desc, dictOperation, vineyard } = this.state;

    let dataObject = {
      vineyardOperationId,
      dateOfOperation,
      desc,
      dictOperationId: dictOperation.idDictOperacjeNaWinnicy,
      vineyardId: vineyard.idWinnica
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, vineyardOperationsValidationKeys);
    if (arrayOfErrors.length === 0) {
      this.props.onSubmit(this.props.mutation, dataObject);
    } else {
      let error = Object.assign({}, errorMap);
      for (let len = arrayOfErrors.length, i = 0; i < len; ++i) error[arrayOfErrors[i]] = true;
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
      let data = initState.OperacjeNaWinnicy[0];
      this.setState({
        vineyardOperationId: data.idOperacja,
        dateOfOperation: convertDatetimeForm(data.data),
        desc: data.opis ? data.opis : '',
        dictOperation: data.dictOperacjeNaWinnicy,
        vineyard: data.winnica
      });
    }
  }

  render() {
    const { dateOfOperation, desc, dictOperation, vineyard, open, errors } = this.state;

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
              error={errors.dateOfOperation}
              required
              id="dateOfOperation"
              label="Data operacji"
              type="datetime-local"
              value={dateOfOperation}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('dateOfOperation')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.desc}
              id="desc"
              label="Opis operacji"
              placeholder="Opis"
              value={desc}
              multiline
              margin="dense"
              onChange={this.handleChange('desc')}
              variant={'outlined'}
              inputProps={{
                maxLength: '255'
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Query query={getDictVineyardOperations}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <TextField
                    fullWidth
                    error={errors.dictOperation}
                    required
                    id="dictOperation"
                    select
                    label="Operacja"
                    placeholder="Operacja"
                    value={dictOperation.nazwa ? dictOperation.nazwa : ''}
                    onChange={this.handleSelect('dictOperation', data.DictOperacjeNaWinnicy)}
                    margin="dense"
                    variant={'outlined'}
                  >
                    {data.DictOperacjeNaWinnicy.map(record => (
                      <MenuItem key={record.idDictOperacjeNaWinnicy} value={record.nazwa}>
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

FormVineyardOperation.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
