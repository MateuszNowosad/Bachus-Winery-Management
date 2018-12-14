import React from 'react';
import { Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import { vineyardValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import getDictGrapeType from '../../../queries/DictionaryQueries/getDictGrapeType';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';

const stany = ['czynna', 'rośnie'];

const errorMap = {
  name: false,
  area: false,
  terroir: false,
  dateOfPlanting: false,
  registrationPlotId: false,
  grapeType: false,
  state: false
};

export class FormVineyard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      area: null,
      terroir: '',
      dateOfPlanting: currentDate('date'),
      registrationPlotId: '',
      grapeType: '',
      state: '',
      errors: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, area, terroir, dateOfPlanting, registrationPlotId, grapeType, state } = this.state;
    let dataObject = {
      name,
      area,
      terroir,
      dateOfPlanting,
      registrationPlotId,
      grapeType,
      state
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, vineyardValidationKeys);
    if (arrayOfErrors.length === 0) {
      if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
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
      let data = initState.Winnica[0];
      this.setState({
        name: data.nazwa,
        area: data.powierzchnia,
        terroir: data.terroir ? data.terroir : '',
        dateOfPlanting: data.dataZasadzenia,
        registrationPlotId: data.ewidencyjnyIdDzialki,
        grapeType: data.dictOdmianaWinogron.nazwa,
        state: data.stan
      });
    }
  }

  render() {
    const { name, area, terroir, dateOfPlanting, registrationPlotId, grapeType, state, errors } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.name}
              required
              id="name"
              label="Nazwa winnicy"
              placeholder="Nazwa"
              value={name}
              margin="dense"
              onChange={this.handleChange('name')}
              variant={'outlined'}
              inputProps={{
                maxLength: '40'
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.area}
              required
              id="area"
              label="Powierzchnia"
              value={area}
              type="number"
              margin="dense"
              onChange={this.handleChange('area')}
              variant={'outlined'}
              InputProps={{
                startAdornment: <InputAdornment position="start">Ha</InputAdornment>
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.state}
              required
              id="state"
              select
              label="Stan winnicy"
              placeholder="Stan winnicy"
              value={state}
              onChange={this.handleChange('state')}
              margin="dense"
              variant={'outlined'}
            >
              {stany.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.terroir}
              id="terroir"
              label="Terroir"
              placeholder="Terroir"
              value={terroir}
              multiline
              margin="dense"
              onChange={this.handleChange('terroir')}
              variant={'outlined'}
              inputProps={{
                maxLength: '255'
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.dateOfPlanting}
              required
              id="dateOfPlanting"
              label="Data zasadzenie"
              type="date"
              value={dateOfPlanting}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('dateOfPlanting')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.registrationPlotId}
              required
              id="registrationPlotId"
              label="Ewidencyjny numer działki"
              placeholder="Nr. działki"
              value={registrationPlotId}
              margin="dense"
              onChange={this.handleChange('registrationPlotId')}
              variant={'outlined'}
              inputProps={{
                maxLength: '45'
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Query query={getDictGrapeType}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <TextField
                    fullWidth
                    error={errors.grapeType}
                    required
                    id="grapeType"
                    select
                    label="Odmiana winogron"
                    placeholder="Odmiana winogron"
                    value={grapeType}
                    onChange={this.handleChange('grapeType')}
                    margin="dense"
                    variant={'outlined'}
                  >
                    {data.DictOdmianaWinogron.map(record => (
                      <MenuItem key={record.idOdmianaWinogron} value={record.nazwa}>
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

FormVineyard.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
