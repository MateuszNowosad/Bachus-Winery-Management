import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import { data } from './StaticData';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { batchValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';

const errorMap = {
  amount: false,
  desc: false,
  creationDate: false,
  batchType: false
};

export class FormBatches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      desc: '',
      creationDate: currentDate('dateTime'),
      batchType: '',
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { amount, desc, creationDate, batchType } = this.state;
    let dataObject = { amount, desc, creationDate, batchType };

    let arrayOfErrors = UniversalValidationHandler(dataObject, batchValidationKeys);
    if (arrayOfErrors.length === 0) {
      if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
    } else {
      let error = Object.assign({}, errorMap);
      for (let errorField in arrayOfErrors) {
        error[arrayOfErrors[errorField]] = true;
      }
      this.setState({ error: error });
      this.props.submitAborted();
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { amount, desc, creationDate, batchType, error } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.amount}
              id="amount"
              label="Ilość"
              type={'number'}
              value={amount}
              margin="dense"
              onChange={this.handleChange('amount')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.desc}
              id="desc"
              label="Opis"
              value={desc}
              margin="dense"
              onChange={this.handleChange('desc')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.creationDate}
              id="creationDate"
              label="Data utworzenia"
              type="datetime-local"
              value={creationDate}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('creationDate')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.batchType}
              id="batchType"
              select
              label="Typ partii"
              placeholder="Typ partii"
              value={batchType}
              onChange={this.handleChange('batchType')}
              margin="dense"
              variant={'outlined'}
            >
              {data.data.dictBatchType.map(option => (
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

FormBatches.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
