import React from 'react';
import { Avatar, Button, Grid, IconButton, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { Query } from 'react-apollo';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormAddress } from './subforms/FormAddress';
import PropTypes from 'prop-types';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler.js';
import { usersValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import getDictUserRole from '../../../queries/DictionaryQueries/getDictUserRole';

const errorMap = {
  firstName: false,
  lastName: false,
  login: false,
  password: false,
  PESEL: false,
  eMail: false,
  phoneNumber: false,
  userRole: false,
  photo: false
};

export class FormUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      login: '',
      password: '',
      PESEL: '',
      eMail: '',
      phoneNumber: '',
      address: {},
      userRole: '',
      photo: '',
      imagePreviewUrl: '',
      showPassword: false,
      errors: errorMap,
      passwordStrength: 0
    };
    this.subForm = React.createRef();
  }

  static scorePassword(pass) {
    //TO BE CHANGED, UNLICENSED
    let score = 0;
    if (!pass) return score;

    // award every unique letter until 5 repetitions
    let letters = {};
    for (var i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += variations[check] === true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    if (score > 100) score = 100;

    return parseInt(score);
  }

  handleChange = name => event => {
    if (name === 'password') {
      this.setState({
        passwordStrength: FormUsers.scorePassword(event.target.value)
      });
    }
    this.setState({
      [name]: event.target.value
    });
  };

  handleAddressChange = (name, address) => {
    this.setState({
      [name]: address
    });
  };

  subFormValidation() {
    return this.subForm.current.validate();
  }

  handleSubmit = () => {
    const { firstName, lastName, login, password, PESEL, eMail, phoneNumber, address, userRole, photo } = this.state;

    let dataObject = {
      firstName,
      lastName,
      login,
      password,
      PESEL,
      eMail,
      phoneNumber,
      address,
      userRole,
      photo
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, usersValidationKeys);
    !this.subFormValidation() && arrayOfErrors.push('address');
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

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleFileChange = event => {
    let reader = new FileReader();
    let photo = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        photo: photo,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(photo);
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const {
      firstName,
      lastName,
      login,
      password,
      PESEL,
      eMail,
      phoneNumber,
      userRole,
      imagePreviewUrl,
      showPassword,
      errors
    } = this.state;

    return (
      <div>
        <form
          style={{
            margin: '0% 25%'
          }}
        >
          <Grid container spacing={8} justify={'center'}>
            <Grid item md={6}>
              <TextField
                fullWidth
                error={errors.firstName}
                required
                id="firstName"
                label="Imię"
                placeholder="Imię"
                value={firstName}
                margin="dense"
                onChange={this.handleChange('firstName')}
                variant={'outlined'}
                inputProps={{
                  maxLength: '30',
                  minwidth: '400'
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                error={errors.lastName}
                required
                id="lastName"
                label="Nazwisko"
                placeholder="Nazwisko"
                value={lastName}
                margin="dense"
                onChange={this.handleChange('lastName')}
                variant={'outlined'}
                inputProps={{
                  maxLength: '30'
                }}
              />
            </Grid>
            <Grid item md={6}>
              <input hidden accept="image/*" id="addImage" type="file" onChange={this.handleFileChange} />
              <label htmlFor="addImage">
                <Button variant="contained" component="span">
                  Dodaj zdjęcie
                </Button>
              </label>
            </Grid>
            <Grid item md={6}>
              <Avatar
                alt="Zdjęcie użytkownika"
                src={imagePreviewUrl}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 0
                }}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                error={errors.eMail}
                required
                id="eMail"
                label="Adres e-mail"
                placeholder="Adres e-mail"
                value={eMail}
                margin="dense"
                onChange={this.handleChange('eMail')}
                variant={'outlined'}
                inputProps={{
                  maxLength: '40'
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                error={errors.login}
                required
                id="login"
                label="Login"
                placeholder="Login"
                value={login}
                margin="dense"
                onChange={this.handleChange('login')}
                variant={'outlined'}
                inputProps={{
                  maxLength: '10'
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                error={errors.password}
                required
                id="password"
                label="Haslo"
                placeholder="Haslo"
                value={password}
                type={showPassword ? 'text' : 'password'}
                margin="dense"
                onChange={this.handleChange('password')}
                variant={'outlined'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  maxLength: '60'
                }}
              />
              Siła hasła
              <LinearProgress variant="determinate" value={this.state.passwordStrength} />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                error={errors.PESEL}
                required
                id="PESEL"
                label="PESEL"
                placeholder="PESEL"
                value={PESEL}
                margin="dense"
                inputProps={{
                  maxLength: '11'
                }}
                onChange={this.handleChange('PESEL')}
                variant={'outlined'}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                error={errors.phoneNumber}
                required
                id="phoneNumber"
                label="Numer telefonu"
                placeholder="Numer telefonu"
                value={phoneNumber}
                margin="dense"
                inputProps={{
                  maxLength: '11'
                }}
                onChange={this.handleChange('phoneNumber')}
                variant={'outlined'}
              />
            </Grid>
            <Grid item md={6}>
              <Query query={getDictUserRole}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;
                  return (
                    <TextField
                      fullWidth
                      error={errors.userRole}
                      required
                      id="userRole"
                      select
                      label="Rola użytkownika"
                      placeholder="Rola użytkownika"
                      value={userRole}
                      onChange={this.handleChange('userRole')}
                      margin="dense"
                      variant={'outlined'}
                    >
                      {data.DictRolaUzytkownikow.map(record => (
                        <MenuItem key={record.idRolaUzytkownikow} value={record.nazwa}>
                          {record.nazwa}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }}
              </Query>
            </Grid>
            <Grid item md={12}>
              <FormAddress varName="address" onChange={this.handleAddressChange} ref={this.subForm} />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

FormUsers.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
