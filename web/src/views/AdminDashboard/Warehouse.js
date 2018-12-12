import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import List from '@material-ui/core/List/List';
import Drawer from '@material-ui/core/Drawer/Drawer';
import PlaceIcon from '@material-ui/icons/Place';
import getWarehouseForList from '../../queries/getWarehouseForList';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import WarehouseDetails from './Subpages/WarehouseDetails';
import ListItemLink from '../../components/Drawer/ListItemLink';

class Warehouse extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Typography variant="h4" gutterBottom component="h2">
            Magazyny
          </Typography>
          <Switch>
            <Route path={'/admindashboard/warehouse/:id'} exact={true} component={WarehouseDetails} />
          </Switch>
        </main>
        <Drawer className={classes.drawer} variant="permanent" anchor="right">
          <div className={classes.appBarSpacer} />
          <List>
            <Query query={getWarehouseForList}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                console.log('33,  jakub: query odpalone: ', data);
                let warehouses = data.Magazyn;
                return warehouses.map(text => (
                  <ListItemLink
                    key={text.idMagazyn}
                    icon={<PlaceIcon />}
                    primary={`${text.adres.miasto} ${text.adres.ulica} ${text.adres.nrPosesji}`}
                    to={'/admindashboard/warehouse/' + text.idMagazyn}
                    secondary={`${text.rodzaj}`}
                  />
                ));
              }}
            </Query>
          </List>
        </Drawer>
      </div>
    );
  }
}

Warehouse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(Warehouse);
