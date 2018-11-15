import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export class FormDictBatchType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      unit: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, unit } = this.state;
    this.props.onSubmit({ name, unit });
    this.props.formSubmitted();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { name, unit } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="name"
              label="Nazwa typu partii"
              placeholder="Nazwa typu partii"
              value={name}
              margin="dense"
              onChange={this.handleChange('name')}
              variant={'outlined'}
              inputProps={{
                maxLength: '45'
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="unit"
              label="Jednostka"
              placeholder="Jednostka"
              value={unit}
              margin="dense"
              onChange={this.handleChange('unit')}
              variant={'outlined'}
              inputProps={{
                maxLength: '45'
              }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormDictBatchType.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
