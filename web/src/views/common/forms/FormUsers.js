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
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import currentDate from './CurrentDate';

const errorMap = {
  firstName: false,
  lastName: false,
  login: false,
  password: false,
  PESEL: false,
  eMail: false,
  phoneNumber: false,
  userRole: false,
  photoURL: false
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
      photoURL: '',
      showPassword: false,
      errors: errorMap,
      passwordStrength: 0
    };
    this.subForm = React.createRef();
  }

  static scorePassword(password) {
    let score = 0;
    if (!password) return score;

    let letters = {};
    for (let i = 0; i < password.length; i++) {
      letters[password[i]] = (letters[password[i]] || 0) + 1;
      score += 5.0 / letters[password[i]];
    }
    let variations = {
      digits: /\d/.test(password),
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      nonWords: /\W/.test(password)
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += variations[check] === true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    if (score > 100) score = 100;

    return score;
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

  handleSelect = (name, data) => event => {
    this.setState({
      [name]: data.find(record => record.nazwa === event.target.value)
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
    const {
      userId,
      firstName,
      lastName,
      login,
      password,
      PESEL,
      eMail,
      phoneNumber,
      userRole,
      isActive,
      photoURL,
      address: { addressId, street, buildingNumber, apartmentNumber, postalCode, city, country }
    } = this.state;

    let dataObject = {
      userId,
      firstName,
      lastName,
      login,
      password,
      PESEL,
      eMail,
      phoneNumber,
      userRoleId: userRole.idRolaUzytkownikow,
      lastLoginDate: currentDate('dateTime'),
      isActive: isActive ? isActive : '1',
      photoURL: String(photoURL),
      addressId,
      street,
      buildingNumber,
      apartmentNumber,
      postalCode,
      city,
      country
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, usersValidationKeys);
    !this.subFormValidation() && arrayOfErrors.push('address');
    if (arrayOfErrors.length === 0) {
      this.props.onSubmit(this.props.mutation, dataObject);
    } else {
      let error = Object.assign({}, errorMap);
      for (let len = arrayOfErrors.length, i = 0; i < len; ++i) error[arrayOfErrors[i]] = true;
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

    reader.readAsDataURL(photo);

    reader.onload = () => {
      this.setState({
        photoURL: reader.result
      });
    };
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  componentDidMount() {
    const { initState } = this.props;
    if (initState) {
      let data = initState.Uzytkownicy[0];
      this.setState({
        userId: data.idUzytkownika,
        firstName: data.imie,
        lastName: data.nazwisko,
        login: data.login,
        // password: data.haslo,
        PESEL: data.PESEL,
        eMail: data.eMail,
        phoneNumber: data.nrTelefonu,
        userRole: data.rola ? data.rola : '',
        isActive: data.czyAktywne,
        photoURL: data.zdjecie ? data.zdjecie : ''
      });
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
      photoURL,
      showPassword,
      errors
    } = this.state;

    const { initState } = this.props;
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
                src={photoURL}
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
                onChange={this.handleChange('phoneNumber')}
                variant={'outlined'}
              />
            </Grid>
            <Grid item md={6}>
              <Query query={getDictUserRole}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return (
                    <TextField
                      fullWidth
                      error={errors.userRole.nazwa}
                      required
                      id="userRole"
                      select
                      label="Rola użytkownika"
                      placeholder="Rola użytkownika"
                      value={userRole ? userRole.nazwa : ''}
                      onChange={this.handleSelect('userRole', data.DictRolaUzytkownikow)}
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
              <FormAddress
                varName="address"
                onChange={this.handleAddressChange}
                ref={this.subForm}
                initState={initState ? initState.Uzytkownicy[0].adres : null}
              />
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
