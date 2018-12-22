import React from 'react';
import { Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { FormAddress } from './subforms/FormAddress';
import PropTypes from 'prop-types';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { warehouseValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';

const types = ['magazyn produktów', 'magazyn półproduktów'];

const errorMap = {
  type: false,
  capacity: false
};

export class FormWarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      capacity: '',
      address: {},
      errors: errorMap
    };
    this.subForm = React.createRef();
  }

  subFormValidation() {
    return this.subForm.current.validate();
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
    let dataObject = {
      type,
      capacity,
      address
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, warehouseValidationKeys);
    !this.subFormValidation() && arrayOfErrors.push('address');
    if (arrayOfErrors.length === 0) {
      if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
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
      let data = initState.Magazyn[0];
      this.setState({
        //TODO poprawić rodzaj magazynu
        type: data.rodzaj,
        capacity: data.pojemnosc
      });
    }
  }

  render() {
    const { type, capacity, errors } = this.state;
    const { initState } = this.props;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.type}
              required
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
              error={errors.capacity}
              required
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
            <FormAddress
              varName="address"
              onChange={this.handleAddressChange}
              ref={this.subForm}
              initState={initState ? initState.Magazyn[0].adres : null}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormWarehouse.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
