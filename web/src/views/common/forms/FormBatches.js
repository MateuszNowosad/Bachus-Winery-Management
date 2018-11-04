import React from 'react';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { dictBatchType } from './StaticData';

export class FormBatches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      desc: '',
      creationDate: '',
      batchType: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { amount, desc, creationDate, batchType } = this.state;
    this.props.onSubmit({ amount, desc, creationDate, batchType });
  };

  render() {
    const { amount, desc, creationDate, batchType } = this.state;
    return (
      <Paper style={{ margin: '2% 20%' }}>
        <Typography variant={'h6'} align={'center'}>
          Nowa partia
        </Typography>
        <form style={{ margin: '0% 25%' }}>
          <Grid container spacing={8} justify={'center'}>
            <Grid item sm={12}>
              <TextField
                fullWidth
                id="amount"
                label="Ilość"
                tpye={'number'}
                value={amount}
                margin="dense"
                onChange={this.handleChange('amount')}
                variant={'outlined'}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                fullWidth
                id="desc"
                label="Opis"
                value={desc}
                margin="dense"
                onChange={this.handleChange('desc')}
                variant={'outlined'}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                fullWidth
                id="creationDate"
                label="Data utworzenia"
                type="date"
                value={creationDate}
                InputLabelProps={{
                  shrink: true
                }}
                margin="dense"
                onChange={this.handleChange('creationDate')}
                variant={'outlined'}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                fullWidth
                id="batchType"
                select
                label="Typ partii"
                placeholder="Typ partii"
                value={batchType}
                onChange={this.handleChange('batchType')}
                margin="dense"
                variant={'outlined'}
              >
                {dictBatchType.map(option => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
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
