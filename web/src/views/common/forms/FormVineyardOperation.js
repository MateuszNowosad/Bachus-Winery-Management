import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export class FormVineyardOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOfOperation: '',
      desc: '',
      dictOperation: ''
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
    const { dateOfOperation, desc, dictOperation } = this.state;
    const { dictOperations } = this.props;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="dateOfOperation"
              label="Data operacji"
              type="date"
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
              id="dictOperation"
              select
              label="Operacja"
              placeholder="Operacja"
              value={dictOperation}
              onChange={this.handleChange('dictOperation')}
              margin="dense"
              variant={'outlined'}
            >
              {dictOperations.map(option => (
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
