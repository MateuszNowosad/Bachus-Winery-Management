import React from 'react';
import {
  Grid,
  MenuItem,
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const operations = ['fermentacja', 'dojrzewanie'];

const errorMap = {
  beginAmount: false,
  endAmount: false,
  beginDate: false,
  endDate: false,
  alcoholContent: false,
  additiveAmount: false,
  sugarContent: false,
  acidity: false,
  temperature: false,
  desc: false,
  process: false
};

export class FormOperations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beginAmount: '',
      endAmount: '',
      beginDate: currentDate('dateTime'),
      endDate: currentDate('dateTime'),
      alcoholContent: '',
      additiveAmount: '',
      sugarContent: '',
      acidity: '',
      temperature: '',
      desc: '',
      process: '',
      error: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const {
      beginAmount,
      endAmount,
      beginDate,
      endDate,
      alcoholContent,
      additiveAmount,
      sugarContent,
      acidity,
      temperature,
      desc,
      process
    } = this.state;
    this.props.onSubmit({
      beginAmount,
      endAmount,
      beginDate,
      endDate,
      alcoholContent,
      additiveAmount,
      sugarContent,
      acidity,
      temperature,
      desc,
      process
    });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const {
      beginAmount,
      endAmount,
      beginDate,
      endDate,
      alcoholContent,
      additiveAmount,
      sugarContent,
      acidity,
      temperature,
      desc,
      process,
      error
    } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.process}
              id="process"
              select
              label="Rodzaj operacji"
              placeholder="Rodzaj operacji"
              value={process}
              onChange={this.handleChange('process')}
              margin="dense"
              variant={'outlined'}
            >
              {operations.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.beginAmount}
              id="beginAmount"
              label="Ilość początkowa"
              value={beginAmount}
              margin="dense"
              type="number"
              onChange={this.handleChange('beginAmount')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.endAmount}
              id="endAmount"
              label="Ilość końcowa"
              value={endAmount}
              margin="dense"
              type="number"
              onChange={this.handleChange('endAmount')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.beginData}
              id="beginDate"
              label="Data początku"
              type="datetime-local"
              value={beginDate}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('beginDate')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.endDate}
              id="endDate"
              label="Data zakończenia"
              type="datetime-local"
              value={endDate}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('endDate')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.alcoholContent}
              id="alcoholContent"
              label="Zawartość alkoholu"
              value={alcoholContent}
              margin="dense"
              type="number"
              onChange={this.handleChange('alcoholContent')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.additiveAmount}
              id="additiveAmount"
              label="Ilość dodatku"
              value={additiveAmount}
              margin="dense"
              type="number"
              onChange={this.handleChange('additiveAmount')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.sugarContent}
              id="sugarContent"
              label="Zawartość cukru"
              value={sugarContent}
              margin="dense"
              type="number"
              onChange={this.handleChange('sugarContent')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.acidity}
              id="acidity"
              label="Kwasowość"
              value={acidity}
              margin="dense"
              type="number"
              onChange={this.handleChange('acidity')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={error.temperature}
              id="temperature"
              label="Temperatura"
              value={temperature}
              margin="dense"
              type="number"
              onChange={this.handleChange('temperature')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={error.desc}
              id="desc"
              label="Opis"
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
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="inherit">Produkty z magazynu</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails />
            </ExpansionPanel>
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormOperations.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
