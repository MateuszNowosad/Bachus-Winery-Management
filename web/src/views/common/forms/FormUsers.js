import React from 'react';
import { Avatar, Button, Grid, IconButton, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormAddress } from './FormAddress';
import PropTypes from 'prop-types';

const roles = ['administrator', 'pracownik produkcji', 'pracownik magazynu'];

export const formTitle = 'Nowy użytkownik';

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
      userRole: '',
      photo: null,
      showPassword: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const {
      firstName,
      lastName,
      login,
      password,
      PESEL,
      eMail,
      phoneNumber,
      userRole,
      photo,
      imagePreviewUrl
    } = this.state;

    this.props.onSubmit({
      firstName,
      lastName,
      login,
      password,
      PESEL,
      eMail,
      phoneNumber,
      userRole,
      photo,
      imagePreviewUrl
    });
    this.props.formSubmitted();
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
      showPassword
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
                id="firstName"
                label="Imię"
                placeholder="Imię"
                value={firstName}
                margin="dense"
                onChange={this.handleChange('firstName')}
                variant={'outlined'}
                inputProps={{
                  maxLength: '30',
                  minWidth: '400'
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
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
                <Button variant="raised" component="span">
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
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
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
                id="phoneNumber"
                label="Numer telefonu"
                placeholder="Numer telefonu"
                value={phoneNumber}
                margin="dense"
                inputProps={{
                  maxLength: '9'
                }}
                onChange={this.handleChange('phoneNumber')}
                variant={'outlined'}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="userRole"
                select
                label="Rola użytkownika"
                placeholder="Rola użytkownika"
                value={userRole}
                onChange={this.handleChange('userRole')}
                margin="dense"
                variant={'outlined'}
              >
                {roles.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12}>
              <FormAddress />
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
  formSubmitted: PropTypes.func
};
