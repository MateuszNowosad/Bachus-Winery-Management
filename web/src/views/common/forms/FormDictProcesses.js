import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import UniversalValidationHandler from "./UniversalValidationHandler/UniversalValidationHandler";
import {processesDictValidationKeys} from "./UniversalValidationHandler/validationKeys/validationKeys";

const errorMap = {
  name: false,
  desc: false,
  additional: false
};

export class FormDictProcesses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      additional: '',
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, desc, additional } = this.state;
      let dataObject = {
          name, desc, additional
      };

      let arrayOfErrors = UniversalValidationHandler(dataObject, processesDictValidationKeys);
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
    const { name, desc, additional, error } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.name}
              id="name"
              label="Nazwa procesu"
              placeholder="Nazwa procesu"
              value={name}
              margin="dense"
              onChange={this.handleChange('name')}
              variant={'outlined'}
              inputProps={{
                maxLength: '40'
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.desc}
              id="desc"
              label="Opis procesu"
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
            <TextField
              fullWidth
              error={error.additional}
              id="additional"
              label="Dodatkowe informacje"
              placeholder="Dodatkowe informacje"
              value={additional}
              multiline
              margin="dense"
              onChange={this.handleChange('additional')}
              variant={'outlined'}
              inputProps={{
                maxLength: '80'
              }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormDictProcesses.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
