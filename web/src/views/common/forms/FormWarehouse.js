import React from 'react';
import { Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { FormAddress } from './FormAddress';
import PropTypes from 'prop-types';

const types = ['magazyn produktów', 'magazyn półproduktów'];

export class FormWarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      capacity: '',
      address: {}
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleAddressChange = (name, address) => {
    this.setState({
      [name]: address
    });
  };

  handleSubmit = () => {
    const { type, capacity, address } = this.state;
    this.props.onSubmit({ type, capacity, address });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { type, capacity } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="type"
              select
              label="Rodzaj magazynu"
              placeholder="Rodzaj magazynu"
              value={type}
              onChange={this.handleChange('type')}
              margin="dense"
              variant={'outlined'}
            >
              {types.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="capacity"
              label="Pojemność"
              value={capacity}
              type="number"
              margin="dense"
              onChange={this.handleChange('capacity')}
              variant={'outlined'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    m<sub>3</sub>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <FormAddress varName="address" onChange={this.handleAddressChange} />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormWarehouse.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
