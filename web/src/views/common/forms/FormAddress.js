import React from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import PropTypes from 'prop-types';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { addressValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';

const errorMap = {
  street: false,
  buildingNumber: false,
  apartmentNumber: false,
  postalCode: false,
  city: false,
  country: false
};

export class FormAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      buildingNumber: '',
      apartmentNumber: '',
      postalCode: '',
      city: '',
      country: '',
      error: errorMap
    };
  }

  validate() {
    const { street, buildingNumber, apartmentNumber, postalCode, city, country } = this.state;

    let dataObject = {
      street,
      buildingNumber,
      apartmentNumber,
      postalCode,
      city,
      country
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, addressValidationKeys);
    if (arrayOfErrors.length === 0) {
       this.setState({error: errorMap});
      return true;
    } else {
      let error = Object.assign({}, errorMap);
      for (let errorField in arrayOfErrors) {
        error[arrayOfErrors[errorField]] = true;
      }
      this.setState({ error: error });
      return false;
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    const { street, buildingNumber, apartmentNumber, postalCode, city, country } = this.state;
    const { varName } = this.props;
    this.props.onChange(varName, {
      street,
      buildingNumber,
      apartmentNumber,
      postalCode,
      city,
      country
    });
  };

  render() {
    const { street, buildingNumber, apartmentNumber, postalCode, city, country, error } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={error.city}
            id="city"
            label="Miasto"
            placeholder="Miasto"
            value={city}
            margin="dense"
            onChange={this.handleChange('city')}
            variant={'outlined'}
            inputProps={{
              maxLength: '20'
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={error.street}
            id="street"
            label="Ulica"
            placeholder="Ulica"
            value={street}
            margin="dense"
            onChange={this.handleChange('street')}
            variant={'outlined'}
            inputProps={{
              maxLength: '45'
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={error.buildingNumber}
            id="buildingNumber"
            label="Nr. posesji"
            placeholder="Nr. posesji"
            value={buildingNumber}
            margin="dense"
            onChange={this.handleChange('buildingNumber')}
            variant={'outlined'}
            inputProps={{
              maxLength: '5'
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={error.apartmentNumber}
            id="apartmentNumber"
            label="Nr. lokalu"
            placeholder="Nr. lokalu"
            value={apartmentNumber}
            margin="dense"
            onChange={this.handleChange('apartmentNumber')}
            variant={'outlined'}
            inputProps={{
              maxLength: '2'
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={error.postalCode}
            id="postalCode"
            label="Kod pocztowy"
            placeholder="Kod pocztowy"
            value={postalCode}
            margin="dense"
            onChange={this.handleChange('postalCode')}
            variant={'outlined'}
            inputProps={{
              maxLength: '5'
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            error={error.country}
            id="country"
            label="Kraj"
            placeholder="Kraj"
            value={country}
            margin="dense"
            onChange={this.handleChange('country')}
            variant={'outlined'}
            inputProps={{
              maxLength: '45'
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

FormAddress.propTypes = {
  varName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
