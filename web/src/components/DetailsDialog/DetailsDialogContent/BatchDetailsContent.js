import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography';
import convertDatetime from '../../../functions/convertDatetime';
import { Avatar, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import React from 'react';
import AddressDetailsContent from './AddressDetailsContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormParcel } from '../../../views/common/forms/subforms/FormParcel';
import AutoTable from '../../AutoTable/AutoTable';

const BatchDetailsContent = props => {
  let batch = props.queryData.Partie[0];
  return (
    <Grid container direction={'column'}>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Identyfikator partii
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {batch.idPartie}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Opis partii
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {batch.opis}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Typ partii
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Partia {batch.typPartii.nazwa}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Rozmiar partii
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {batch.ilosc} {batch.typPartii.jednostka}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Data utworzenia
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {convertDatetime(batch.dataUtworzenia)}
          </Typography>
        </Grid>
      </Grid>
      {batch.typPartii.nazwa === ('Wina' || 'Butelek wina') && (
        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
          <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
            <Typography variant="h4" gutterBottom component="h1">
              Informacje o winie
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" gutterBottom component="h1">
              Nazwa wina
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {batch.informacjeOWinie.nazwa}
            </Typography>
            <Typography variant="h5" gutterBottom component="h1">
              Kategoria wina
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {batch.informacjeOWinie.kategoriaWina.nazwaKategoria}
            </Typography>
            <Typography variant="h5" gutterBottom component="h1">
              Alergeny
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {batch.informacjeOWinie.zawartoscPotAlergenow}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" gutterBottom component="h1">
              Motto
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {batch.informacjeOWinie.motto}
            </Typography>
            <Typography variant="h5" gutterBottom component="h1">
              Wartość energetyczna
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {batch.informacjeOWinie.wartoscEnergetyczna} kcal
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container direction="row" justify="flex-end" alignItems="stretch">
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Utworzone partie</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AutoTable queryData={batch.partie} querySize={batch.partie.length} editMode={false} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="flex-end" alignItems="stretch">
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Wykonane operacje</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AutoTable queryData={batch.operacje} querySize={batch.operacje.length} editMode={false} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BatchDetailsContent;
