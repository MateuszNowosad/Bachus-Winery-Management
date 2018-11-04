import React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

export class FormDictUserRole extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      type: ''
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
  };

  render() {
    const { name, desc, type } = this.state;
    return (
      <Paper style={{ margin: '2% 40%' }}>
        <Typography variant={'h6'} align={'center'}>
          Nowa rola użytkownika
        </Typography>
        <form style={{ margin: '0% 25%' }}>
          <Grid container spacing={8} justify={'center'}>
            <Grid item md={12}>
              <TextField
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
            <Grid item>
              <Button variant={'outlined'} style={{ margin: '5% 0' }} onClick={this.handleSubmit}>
                Dodaj
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}
