import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  TextField,
  InputAdornment,
  Paper
} from '@material-ui/core';
import { Query } from 'react-apollo';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';
import getWarehouses from '../../../queries/getWarehouses';
import getItemsFromWarehouse from '../../../queries/getItemsFromWarehouse';

function getSteps() {
  return ['Wybierz magazyn', 'Wybierz produkt', 'Określ rozmiar'];
}

class StepperItemFromWarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      selectedWarehouse: {},
      selectedItem: {},
      fullItem: false,
      valuePercent: '',
      value: ''
    };
  }

  handleSelect = (name, object) => {
    this.setState({
      [name]: object
    });
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleValueChange = event => {
    this.setState({
      valuePercent: event.target.value,
      value: (event.target.value / 100) * this.state.selectedItem.ilosc
    });
  };

  filterItems = data => {
    const { content } = this.props;
    return data.pozycjaWMagazynie.filter(item => content.every(val => item.idPozycja !== val.key));
  };

  getStepContent = step => {
    // TODO naprawić zmianę stanu
    switch (step) {
      case 0:
        return (
          <Query query={getWarehouses}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <SelectableAutoTable
                  queryData={data.Magazyn}
                  // querySubject="Magazyn"
                  querySize={data.Magazyn.length}
                  funParam="selectedWarehouse"
                  onSelect={this.handleSelect}
                  id={this.state.selectedWarehouse.idMagazyn}
                />
              );
            }}
          </Query>
        );
      case 1:
        return (
          <Query query={getItemsFromWarehouse(this.state.selectedWarehouse.idMagazyn)}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <SelectableAutoTable
                  queryData={this.filterItems(data.Magazyn[0])}
                  // querySubject={'pozycjaWMagazynie'}
                  querySize={data.Magazyn[0].pozycjaWMagazynie.length}
                  funParam="selectedItem"
                  onSelect={this.handleSelect}
                  id={this.state.selectedItem.idPozycja}
                />
              );
            }}
          </Query>
        );
      case 2:
        return (
          <Paper
            style={{
              padding: '5% 5%'
            }}
          >
            <FormControlLabel
              control={<Switch checked={this.state.fullItem} onChange={this.handleChangeCheck('fullItem')} />}
              label="Całość"
            />
            {!this.state.fullItem && (
              <div>
                <TextField
                  id="value"
                  label="Ilość"
                  value={this.state.valuePercent}
                  onChange={this.handleValueChange}
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    inputProps: { min: 1, max: 99, maxLength: 2 },
                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                  }}
                  margin="dense"
                  variant="outlined"
                />
                <Typography variant={'body1'}>
                  {this.state.value} of {this.state.selectedItem.ilosc}
                </Typography>
              </div>
            )}
          </Paper>
        );
      default:
        return 'Unknown step';
    }
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSubmit = () => {
    const { selectedItem, value, fullItem } = this.state;
    const object = {
      key: selectedItem.idPozycja,
      selectedItem: selectedItem,
      amount: fullItem ? selectedItem.ilosc : value
    };
    console.log('161, object jakub: ', object);
    this.props.onSubmit(object);
    this.props.onClose();
  };

  isSelected = step => {
    if (step === 0) {
      return this.state.selectedWarehouse.idMagazyn === undefined;
    }
    if (step === 1) {
      return this.state.selectedItem.idPozycja === undefined;
    }
  };

  render() {
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <Fragment>
        <Stepper activeStep={activeStep}>
          {steps.map(label => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          <div>
            {this.getStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={this.handleBack}>
                Back
              </Button>
              <Button
                disabled={this.isSelected(activeStep)}
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? this.handleSubmit : this.handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

StepperItemFromWarehouse.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default StepperItemFromWarehouse;
