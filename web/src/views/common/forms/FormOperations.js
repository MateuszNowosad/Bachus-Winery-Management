import React from 'react';
import { Grid, MenuItem, TextField, Switch, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';

const operations = ['fermentacja', 'dojrzewanie'];

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
      checkedA: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleInputToggle = name => event => {
    this.setState({ [name]: event.target.checked });
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
      checkedA
    } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
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
              disabled={!checkedA}
              id="endAmount"
              label="Ilość końcowa"
              value={endAmount}
              margin="dense"
              type="number"
              onChange={this.handleChange('endAmount')}
              variant={'outlined'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Switch checked={checkedA} onChange={this.handleInputToggle('checkedA')} value="checkedA" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
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
