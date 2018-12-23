import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography';
import convertDatetime from '../../../functions/convertDatetime';
import { Avatar, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import React from 'react';
import AddressDetailsContent from './AddressDetailsContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormParcel } from '../../../views/common/forms/subforms/FormParcel';
import AutoTable from '../../AutoTable/AutoTable';

const VineyardDetailsContent = props => {
  let vineyard = props.queryData.Winnica[0];
  let grapeHarvest = props.queryData.Winobranie;
  let vineyardOperations = props.queryData.OperacjeNaWinnicy;
  return (
    <Grid container direction={'column'}>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Nazwa
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {vineyard.nazwa}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Terroir
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {vineyard.terroir}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Stan winnicy
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {vineyard.stan}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Data zasadzenia
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {vineyard.dataZasadzenia}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" gutterBottom component="h1">
            Powierzchnia
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {vineyard.powierzchnia}
          </Typography>
          <Typography variant="h5" gutterBottom component="h1">
            Ewidencyjny identyfikator działki
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {vineyard.ewidencyjnyIdDzialki}
          </Typography>
          {vineyard.dataOstatniegoZbioru && (
            <React.Fragment>
              <Typography variant="h5" gutterBottom component="h1">
                Data ostatniego zbioru
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {vineyard.dataOstatniegoZbioru}
              </Typography>
            </React.Fragment>
          )}
          <Typography variant="h5" gutterBottom component="h1">
            Odmiana winogron
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            {vineyard.dictOdmianaWinogron.nazwa}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="flex-end" alignItems="stretch">
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Wykonane operacje na winnicy</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AutoTable queryData={vineyardOperations} querySize={vineyardOperations.length} editMode={false} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid item xs>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="inherit">Winobrania</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AutoTable queryData={grapeHarvest} querySize={grapeHarvest.length} editMode={false} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VineyardDetailsContent;
