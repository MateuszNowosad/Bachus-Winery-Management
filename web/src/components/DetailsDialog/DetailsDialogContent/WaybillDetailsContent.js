import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography';
import {  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import React from 'react';
import AddressDetailsContent from './AddressDetailsContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/es/Button/Button';

const WaybillDetailsContent = props => {
  let waybill = props.queryData.ListPrzewozowy[0];
  return (
    <Grid container direction={'column'}>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Imię kierowcy
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.imieKierowcy}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Uwagi przewoźnika
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.uwagiPrzewoznika}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Nazwisko kierowcy
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.nazwiskoKierowcy}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Zastrzeżenia odbiorcy
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Partia {waybill.zastrzezeniaOdbiorcy}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Nadawca
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.kontrahent.find(curr => curr.typ === 'Nadawca').nazwaSpolki}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Odbiorca
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.kontrahent.find(curr => curr.typ === 'Odbiorca').nazwaSpolki}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Przewoźnik
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.kontrahent.find(curr => curr.typ === 'Przewoznik').nazwaSpolki}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="flex-end" alignItems="stretch">
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Adres odbioru</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AddressDetailsContent address={waybill.adres.find(curr => curr.miejsce === 'Odbioru')} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="flex-end" alignItems="stretch">
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Adres nadania</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AddressDetailsContent address={waybill.adres.find(curr => curr.miejsce === 'Nadania')} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs>
          <Typography variant="h4" gutterBottom component="h1">
            Przesyłka
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Nazwa przesyłki
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.przesylka.nazwaPrzesylki}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Cieżar
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.przesylka.ciezarLadunku}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Data odbioru/dostarczenia
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {waybill.przesylka.data}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="flex-end" alignItems="stretch">
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Zawartość przesyłki</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                {waybill.przesylka.pozycjaWMagazynie.map(curr => (
                  <React.Fragment key={curr.idPozycja}>
                    <Grid item xs>
                      <Typography variant="subtitle1" gutterBottom component="div">
                        {curr.nazwa}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="subtitle1" gutterBottom component="div">
                        {curr.iloscFromJoinTable} {curr.kategorie.jednostka}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs>
          <Button
            variant={'contained'}
            onClick={() => {
              let pdfWindow = window.open('');
              pdfWindow.document.write(
                "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
                  encodeURI(waybill.eDokument) +
                  "'></iframe>"
              );
            }}
          >
            Podgląd dokumentu
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WaybillDetailsContent;
