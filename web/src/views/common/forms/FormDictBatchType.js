import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { batchTypeDictValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';

const errorMap = {
  name: false,
  unit: false
};

export class FormDictBatchType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      unit: '',
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, unit } = this.state;
    let dataObject = {
      name,
      unit
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, batchTypeDictValidationKeys);
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
    const { name, unit, error } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.name}
              id="name"
              label="Nazwa typu partii"
              placeholder="Nazwa typu partii"
              value={name}
              margin="dense"
              onChange={this.handleChange('name')}
              variant={'outlined'}
              inputProps={{
                maxLength: '45'
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.unit}
              id="unit"
              label="Jednostka"
              placeholder="Jednostka"
              value={unit}
              margin="dense"
              onChange={this.handleChange('unit')}
              variant={'outlined'}
              inputProps={{
                maxLength: '45'
              }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormDictBatchType.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
