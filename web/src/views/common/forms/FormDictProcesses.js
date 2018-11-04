import React from 'react';
import { Grid, Paper, TextField, Typography } from '@material-ui/core';
import { FormUsers } from './FormUsers';
import PropTypes from 'prop-types';

export class FormDictProcesses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      additional: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, desc, additional } = this.state;
    this.props.onSubmit({ name, desc, additional });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { name, desc, additional } = this.state;
    return (
      <Paper style={{ margin: '2% 40%' }}>
        <Typography variant={'h6'} align={'center'}>
          Nowy rodzaj procesu
        </Typography>
        <form style={{ margin: '0% 25%' }}>
          <Grid container spacing={8} justify={'center'}>
            <Grid item md={12}>
              <TextField
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
      </Paper>
    );
  }
}

FormUsers.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
