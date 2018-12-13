import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { wineCategoriesDictValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';

const errorMap = {
  name: false,
  desc: false
};

export class FormDictWineCategory extends React.Component {
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
    const { name, desc } = this.state;
    let dataObject = {
      name,
      desc
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, wineCategoriesDictValidationKeys);
    if (arrayOfErrors.length === 0) {
      if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
    } else {
      let error = Object.assign({}, errorMap);
      for (let errorField in arrayOfErrors) {
        error[arrayOfErrors[errorField]] = true;
      }
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
      let data = initState.DictKategoriaWina[0];
      this.setState({
        name: data.nazwaKategoria,
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
              label="Nazwa kategorii wina"
              placeholder="Nazwa kategorii wina"
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
              label="Opis kategorii wina"
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

FormDictWineCategory.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
