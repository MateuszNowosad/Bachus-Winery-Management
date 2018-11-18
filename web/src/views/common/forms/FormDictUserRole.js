import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const errorMap = {
  name: false,
  desc: false,
  type: false
};

export class FormDictUserRole extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      type: '',
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, desc, type } = this.state;
    this.props.onSubmit({ name, desc, type });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { name, desc, type, error } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.name}
              id="name"
              label="Nazwa roli"
              placeholder="Nazwa roli"
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
              error={error.desc}
              id="desc"
              label="Opis roli"
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
              error={error.type}
              id="type"
              label="Typ roli użytkownika"
              placeholder="Typ roli użytkownika"
              value={type}
              margin="dense"
              onChange={this.handleChange('type')}
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

FormDictUserRole.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
