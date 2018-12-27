import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import Tree from '../../../components/Tree/Tree';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  batchDatabaseLabels,
  batchTypeDictDatabaseLabels,
  operationsDatabaseLabels
} from "../../../localisation/DatabaseLabels";
import { Query } from 'react-apollo';
import getSpecificProductionPlan from '../../../queries/ProductionPlansQueries/getSpecificProductionPlan';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import { getProductionPlanDetails } from '../../../queries/ProductionPlansQueries/getProductionPlanDetails';

const MyLink = props => <Link to="/admindashboard/productionplans" {...props} />;

class ProductionPlanDetails extends React.Component {

  treeObjectBuilder(){

  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.top}>
          <Typography variant="h4" gutterBottom component="h2">
            Plan produkcyjny
          </Typography>
          <Button variant="contained" color="primary" component={MyLink}>
            Powrót do poprzedniej strony
          </Button>
        </div>
        <Query query={getSpecificProductionPlan('8')}>
          {({ loading, error, data }) => {
            if (loading) return <CircularProgress />;
            if (error)
              return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
            let productionPlan = data.PlanyProdukcyjne[0];
            return (
              <React.Fragment>
                <Typography variant="h5" gutterBottom component="h1">
                  Nazwa
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                  {/*{planyProdExample['data']['planProd'][0].nazwa}*/}
                  {productionPlan.nazwa}
                </Typography>
                <Typography variant="h5" gutterBottom component="h1">
                  Opis
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                  {/*{planyProdExample['data']['planProd'][0].Opis}*/}
                  {productionPlan.opis}
                </Typography>
                <Typography variant="h5" gutterBottom component="h1">
                  e-dokument
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                  {/*{planyProdExample['data']['planProd'][0].Edokument}*/}
                  {productionPlan.eDokument}
                </Typography>
              </React.Fragment>
            );
          }}
        </Query>
        {/*<Grid container direction="row" justify="center" alignItems="center">*/}
          {/*<Grid item xs>*/}
            {/*<SimpleRadialBarChart />*/}
          {/*</Grid>*/}
          {/*<Grid item xs>*/}
            {/*<TwoLevelPieChart />*/}
          {/*</Grid>*/}
        {/*</Grid>*/}
        <Query query={getProductionPlanDetails} variables={{ id: this.props.match.params.id }}>
          {({ loading, error, data }) => {
            if (loading) return <CircularProgress />;
            if (error)
              return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
            return (
              <Query query={getProductionPlanDetails} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return <Tree
                    queryData={data.Partie[0]}
                    labels={[batchDatabaseLabels, operationsDatabaseLabels, batchTypeDictDatabaseLabels]}
                    hardBreak={'idPartie'}
                  />;
                }}
              </Query>

            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

ProductionPlanDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(ProductionPlanDetails);
