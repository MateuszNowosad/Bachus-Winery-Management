import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import Grid from '@material-ui/core/Grid/Grid';
import SimpleRadialBarChart from '../../../variables/AdminDashboard/ExampleRadialBarChart';
import { TwoLevelPieChart } from '../../../variables/AdminDashboard/ExampleRadarChart';
import planyProdExample from '../../../variables/AdminDashboard/planyProdExample';

class ProductionPlanDetails extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Plan produkcyjny
        </Typography>
        <Typography variant="h5" gutterBottom component="h1">
          Nazwa
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {planyProdExample['data']['planProd'][0].nazwa}
        </Typography>
        <Typography variant="h5" gutterBottom component="h1">
          Opis
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {planyProdExample['data']['planProd'][0].Opis}
        </Typography>
        <Typography variant="h5" gutterBottom component="h1">
          e-dokument
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {planyProdExample['data']['planProd'][0].Edokument}
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs>
            <SimpleRadialBarChart />
          </Grid>
          <Grid item xs>
            <TwoLevelPieChart />
          </Grid>
        </Grid>
        //TODO Tree component
      </React.Fragment>
    );
  }
}

ProductionPlanDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(ProductionPlanDetails);
