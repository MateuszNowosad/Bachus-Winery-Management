import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import { data } from './StaticData';

const errorMap = {
  dateOfOperation: false,
  desc: false,
  dictOperation: false
};

export class FormVineyardOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOfOperation: currentDate('dateTime'),
      desc: '',
      dictOperation: '',
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { dateOfOperation, desc, dictOperation } = this.state;

    this.props.onSubmit({
      dateOfOperation,
      desc,
      dictOperation
    });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { dateOfOperation, desc, dictOperation, error } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.dateOfOperation}
              id="dateOfOperation"
              label="Data operacji"
              type="datetime-local"
              value={dateOfOperation}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('dateOfOperation')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.desc}
              id="desc"
              label="Opis operacji"
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
              error={error.dictOperation}
              id="dictOperation"
              select
              label="Operacja"
              placeholder="Operacja"
              value={dictOperation}
              onChange={this.handleChange('dictOperation')}
              margin="dense"
              variant={'outlined'}
            >
              {data.data.vineyardOperations.map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormVineyardOperation.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
