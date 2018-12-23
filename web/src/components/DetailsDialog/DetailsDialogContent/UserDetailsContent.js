import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography';
import convertDatetime from '../../../functions/convertDatetime';
import { Avatar } from '@material-ui/core';
import React from 'react';
import AddressDetailsContent from './AddressDetailsContent';

const UserDetailsContent = props => {
  let user = props.queryData.Uzytkownicy[0];
  return (
    <Grid container direction={'column'}>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Imię
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {user.imie}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Nazwisko
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {user.nazwisko}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Email
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {user.eMail}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Numer telefonu
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {user.nrTelefonu}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Login
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {user.login}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Rola użytkownika
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {user.rola.nazwa}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Data ostatniego logowania
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {convertDatetime(user.dataOstatniegoLogowania)}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Zdjecie
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            <Avatar
              alt="Zdjęcie użytkownika"
              src={user.zdjecie}
              style={{
                width: 250,
                height: 250,
                margin: 10
              }}
            />
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Typography variant="h4" gutterBottom component="h1">
          Adres
        </Typography>
      </Grid>
      <AddressDetailsContent address={user.adres} />
    </Grid>
  );
};

export default UserDetailsContent;
