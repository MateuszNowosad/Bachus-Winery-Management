import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import React from 'react';
import AddressDetailsContent from './AddressDetailsContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AutoTable from '../../AutoTable/AutoTable';

const WarehouseDetailsContent = props => {
  let warehouse = props.queryData.Magazyn[0];
  return (
    <Grid container direction={'column'}>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Rodzaj magazynu
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {warehouse.rodzaj}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Pojemność
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {warehouse.pojemnosc}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Typography variant="h4" gutterBottom component="h1">
          Adres
        </Typography>
      </Grid>
      <AddressDetailsContent address={warehouse.adres} />
      <Grid container direction="row" justify="flex-end" alignItems="stretch">
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Pozycje w magazynie</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AutoTable
                queryData={warehouse.pozycjaWMagazynie}
                querySize={warehouse.pozycjaWMagazynie.length}
                editMode={false}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WarehouseDetailsContent;
