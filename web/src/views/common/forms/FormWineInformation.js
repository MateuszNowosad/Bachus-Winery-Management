import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import { data } from './StaticData';
import PropTypes from 'prop-types';
import UniversalValidationHandler from "./UniversalValidationHandler/UniversalValidationHandler";
import {wineInformationValidationKeys} from "./UniversalValidationHandler/validationKeys/validationKeys";

const errorMap = {
  name: false,
  motto: false,
  allergens: false,
  energyValue: false,
  wineCategory: false
};

export class FormWineInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      motto: '',
      allergens: '',
      energyValue: 0,
      wineCategory: '',
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, motto, allergens, energyValue, wineCategory } = this.state;
      let dataObject = {
          name, motto, allergens, energyValue, wineCategory
      };

      let arrayOfErrors = UniversalValidationHandler(dataObject, wineInformationValidationKeys);
      if (arrayOfErrors.length === 0) {
          if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
      } else{
          let error = Object.assign({}, errorMap);
          for (let errorField in arrayOfErrors) {
              error[arrayOfErrors[errorField]] = true;
          }
          this.setState({error: error});
          this.props.submitAborted();
      }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { name, motto, allergens, energyValue, wineCategory, error } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.name}
              id="name"
              label="Nazwa wina"
              value={name}
              margin="dense"
              onChange={this.handleChange('name')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.motto}
              id="motto"
              label="Motto"
              value={motto}
              margin="dense"
              onChange={this.handleChange('motto')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.allergens}
              id="allergens"
              label="Zawarte alergeny"
              value={allergens}
              margin="dense"
              onChange={this.handleChange('allergens')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.energyValue}
              id="energyValue"
              label="Wartość energetyczna"
              type="number"
              value={energyValue}
              margin="dense"
              onChange={this.handleChange('energyValue')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="wineCategory"
              select
              label="Kategoria wina"
              placeholder="Kategoria wina"
              value={wineCategory}
              error={error.wineCategory}
              onChange={this.handleChange('wineCategory')}
              margin="dense"
              variant={'outlined'}
            >
              {data.data.dictWineCategories.map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormWineInformation.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
