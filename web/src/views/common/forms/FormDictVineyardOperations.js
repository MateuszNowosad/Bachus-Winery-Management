import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { vineyardOperationsDictValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';

const errorMap = {
  name: false,
  desc: false
};

export class FormDictVineyardOperations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      errors: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, desc, dictVineyardOperationId } = this.state;
    let dataObject = {
      dictVineyardOperationId,
      name,
      desc
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, vineyardOperationsDictValidationKeys);
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
      let data = initState.DictOperacjeNaWinnicy[0];
      this.setState({
        dictVineyardOperationId: data.idDictOperacjeNaWinnicy,
        name: data.nazwa,
        desc: data.opis ? data.opis : ''
      });
    }
  }

  render() {
    const { name, desc, errors } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.name}
              required
              id="name"
              label="Nazwa operacji"
              placeholder="Nazwa operacji"
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
              error={errors.desc}
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
        </Grid>
      </form>
    );
  }
}

FormDictVineyardOperations.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
