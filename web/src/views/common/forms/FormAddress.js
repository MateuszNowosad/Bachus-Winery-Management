import React from 'react';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import PropTypes from 'prop-types';

export class FormAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      buildingNumber: '',
      apartmentNumber: '',
      postalCode: '',
      city: '',
      country: ''
    };
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
    const { street, buildingNumber, apartmentNumber, postalCode, city, country } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item md={6}>
          <TextField
            fullWidth
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
