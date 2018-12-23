import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AutoTable from '../../AutoTable/AutoTable';

const GrapeHarvestDetailsContent = props => {
  let grapeHarvest = props.queryData.Winobranie[0];
  return (
    <Grid container direction={'column'}>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Data winobrania
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {grapeHarvest.dataWinobrania}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Winnica
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {grapeHarvest.winnica.nazwa}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Ilość zebranych winogron
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {grapeHarvest.iloscZebranychWinogron}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Odmiana winogron
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {grapeHarvest.winnica.dictOdmianaWinogron.nazwa}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="flex-end" alignItems="stretch">
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Utworzone partie</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AutoTable queryData={grapeHarvest.partie} querySize={grapeHarvest.partie.length} editMode={false} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GrapeHarvestDetailsContent;
