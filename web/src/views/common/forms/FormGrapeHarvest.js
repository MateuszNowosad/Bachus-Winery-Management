import React from 'react';
import { Grid, InputAdornment, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { harvestValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';

const errorMap = {
  dateOfHarvest: false,
  amount: false
};

export class FormGrapeHarvest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateOfHarvest: currentDate('date'),
      amount: 0,
      vineyardId: '1',
      errors: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { grapeHarvestId, dateOfHarvest, amount, vineyardId } = this.state;
    let dataObject = {
      grapeHarvestId,
      dateOfHarvest,
      amount: Number(amount),
      vineyardId,
      vineyardIdFK: vineyardId
    };
    let arrayOfErrors = UniversalValidationHandler(dataObject, harvestValidationKeys);
    if (arrayOfErrors.length === 0) {
      this.props.onSubmit(this.props.mutation, dataObject);
    } else {
      let error = Object.assign({}, errorMap);
      for (let len = arrayOfErrors.length, i = 0; i < len; ++i) error[arrayOfErrors[i]] = true;
      this.setState({ errors: error });
      this.props.submitAborted();
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  componentDidMount() {
    const { initState } = this.props;
    if (initState) {
      let data = initState.Winobranie[0];
      this.setState({
        grapeHarvestId: data.idWinobranie,
        dateOfHarvest: data.dataWinobrania,
        amount: data.iloscZebranychWinogron,
        vineyardId: data.winnica ? data.winnica.idWinnica : '1'
      });
    }
  }

  render() {
    const { dateOfHarvest, amount, errors } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.dateOfHarvest}
              required
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
              error={errors.amount}
              required
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

FormGrapeHarvest.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
