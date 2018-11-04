import React from 'react';
import { Grid, Paper, TextField, Typography } from '@material-ui/core';
import { FormUsers } from './FormUsers';
import PropTypes from 'prop-types';

export class FormDictCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      unit: '',
      desc: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, unit, desc } = this.state;
    this.props.onSubmit({ name, unit, desc });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { name, unit, desc } = this.state;
    return (
      <Paper style={{ margin: '2% 40%' }}>
        <Typography variant={'h6'} align={'center'}>
          Nowa kategoria
        </Typography>
        <form style={{ margin: '0% 25%' }}>
          <Grid container spacing={8} justify={'center'}>
            <Grid item md={12}>
              <TextField
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
      </Paper>
    );
  }
}

FormUsers.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
