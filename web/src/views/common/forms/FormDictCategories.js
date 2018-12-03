import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { categoriesDictValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';

const errorMap = {
  name: false,
  unit: false,
  desc: false
};

export class FormDictCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      unit: '',
      desc: '',
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, unit, desc } = this.state;
    let dataObject = {
      name,
      unit,
      desc
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, categoriesDictValidationKeys);
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
    const { name, unit, desc, error } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.name}
              id="name"
              label="Nazwa kategorii"
              placeholder="Nazwa kategorii"
              value={name}
              margin="dense"
              onChange={this.handleChange('name')}
              variant={'outlined'}
              inputProps={{
                maxLength: '20'
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
                maxLength: '20'
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.desc}
              id="desc"
              label="Opis kategorii"
              placeholder="Opis"
              value={desc}
              multiline
              margin="dense"
              onChange={this.handleChange('desc')}
              variant={'outlined'}
              inputProps={{
                maxLength: '250'
              }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormDictCategories.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
