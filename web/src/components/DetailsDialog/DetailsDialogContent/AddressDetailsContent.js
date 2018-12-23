import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography';
import React from 'react';

const AddressDetailsContent = props => {
  let { address } = props;
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
      <Grid item xs>
        <Typography variant="h5" gutterBottom component="h1">
          Miasto
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {address.miasto}
        </Typography>
        <Typography variant="h5" gutterBottom component="h1">
          Kod pocztowy
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {address.kodPocztowy}
        </Typography>
        <Typography variant="h5" gutterBottom component="h1">
          Kraj
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {address.kraj}
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="h5" gutterBottom component="h1">
          Ulica
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {address.ulica}
        </Typography>
        <Typography variant="h5" gutterBottom component="h1">
          Nr. posesji
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {address.nrPosesji}
        </Typography>
        {address.Lokalu && (
          <React.Fragment>
            <Typography variant="h5" gutterBottom component="h1">
              Nr. lokalu
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {address.nrLokalu}
            </Typography>
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  );
};

export default AddressDetailsContent;
