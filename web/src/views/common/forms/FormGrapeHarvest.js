import React from 'react';
import { Grid, InputAdornment, TextField } from '@material-ui/core';
import { FormUsers } from './FormUsers';
import PropTypes from 'prop-types';

export class FormGrapeHarvest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateOfHarvest: '',
      amount: 0
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { dateOfHarvest, amount } = this.state;
    this.props.onSubmit({ dateOfHarvest, amount });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { dateOfHarvest, amount } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="dateOfHarvest"
              label="Data zbioru"
              type="date"
              value={dateOfHarvest}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('dateOfHarvest')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="amount"
              label="Ilość"
              value={amount}
              type="number"
              margin="dense"
              onChange={this.handleChange('amount')}
              variant={'outlined'}
              InputProps={{
                startAdornment: <InputAdornment position="start">Kg</InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormUsers.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
