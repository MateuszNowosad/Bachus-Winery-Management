import React from 'react';
import { Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import { vineyardValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';

const odmiany = ['Agat doński', 'Ajwaz', 'Alden'];

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
      error: errorMap
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
      this.setState({ error: error });
      this.props.submitAborted();
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { name, area, terroir, dateOfPlanting, registrationPlotId, grapeType, state, error } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.name}
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
              error={error.area}
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
              error={error.state}
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
              error={error.terroir}
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
              error={error.dateOfPlanting}
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
              error={error.registrationPlotId}
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
            <TextField
              fullWidth
              error={error.grapeType}
              id="grapeType"
              select
              label="Odmiana winogron"
              placeholder="Odmiana winogron"
              value={grapeType}
              onChange={this.handleChange('grapeType')}
              margin="dense"
              variant={'outlined'}
            >
              {odmiany.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
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
