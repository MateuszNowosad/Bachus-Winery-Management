import React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

export class FormDictBatchType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      unit: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, unit } = this.state;
    this.props.onSubmit({ name, unit });
  };

  render() {
    const { name, unit } = this.state;
    return (
      <Paper style={{ margin: '2% 40%' }}>
        <Typography variant={'h6'} align={'center'}>
          Nowy typ partii
        </Typography>
        <form style={{ margin: '0% 25%' }}>
          <Grid container spacing={8} justify={'center'}>
            <Grid item>
              <TextField
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
            <Grid item>
              <TextField
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
