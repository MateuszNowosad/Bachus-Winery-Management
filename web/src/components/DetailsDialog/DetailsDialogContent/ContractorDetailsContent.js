import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography';
import React from 'react';
import AddressDetailsContent from './AddressDetailsContent';

const ContractorDetailsContent = (props) => {
  let contractor = props.queryData.Kontrahenci[0];
  return (
    <Grid container direction={'column'}>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Nazwa spółki
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {contractor.nazwaSpolki}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Strona www
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {contractor.stronaWww}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Email
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {contractor.eMail}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Numer telefonu
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {contractor.telefon}
          </Typography>
        </Grid>
        <Grid item xs>
          {contractor.NIP && (
            <React.Fragment>
              <Typography variant="h5" gutterBottom component="h1">
                NIP
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {contractor.NIP}
              </Typography>
            </React.Fragment>)
          }
          {contractor.KRS && (
            <React.Fragment>
              <Typography variant="h5" gutterBottom component="h1">
                KRS
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {contractor.KRS}
              </Typography>
            </React.Fragment>)
          }
          <Typography variant="h5" gutterBottom component="h1">
            Nr. konta
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {contractor.nrKonta}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Fax
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {contractor.fax}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Typography variant="h4" gutterBottom component="h1">
          Adres
        </Typography>
      </Grid>
      <AddressDetailsContent address={contractor.adres}/>
    </Grid>
  );
};

export default ContractorDetailsContent;