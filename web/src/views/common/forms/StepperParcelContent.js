import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { data } from './StaticData';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ['Wybierz magazyn', 'Wybierz produkt', 'Określ rozmiar'];
}

class StepperParcelContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      selectedWarehouse: {},
      selectedItem: {}
    };
  }

  handleSelect = (name, object) => {
    this.setState({
      [name]: object
    });
  };

  getStepContent = step => {
    // TODO naprawić zmianę stanu
    switch (step) {
      case 0:
        console.log('46,  jakub: step 0');
        return (
          <SelectableAutoTable
            queryData={data}
            querySubject="warehouses"
            funParam="selectedWarehouse"
            onSelect={this.handleSelect}
            id={this.state.selectedWarehouse.id}
          />
        );
      case 1:
        console.log('59,  jakub: step 1');
        return (
          <SelectableAutoTable
            queryData={data}
            querySubject={'iteminstock' + this.state.selectedWarehouse.id}
            funParam="selectedItem"
            onSelect={this.handleSelect}
            id={this.state.selectedItem.id}
          />
        );
      case 2:
        return 'This is the bit I really care about!';
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

  isSelected = step => {
    if (step === 0) {
      return this.state.selectedWarehouse.id === undefined;
    }
    if (step === 1) {
      return this.state.selectedItem.id === undefined;
    }
  };

  render() {
    const { classes } = this.props;
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
              <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                disabled={this.isSelected(activeStep)}
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}
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

StepperParcelContent.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(StepperParcelContent);
