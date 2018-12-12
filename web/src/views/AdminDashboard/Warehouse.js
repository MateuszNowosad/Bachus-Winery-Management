import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import List from '@material-ui/core/List/List';
import Drawer from '@material-ui/core/Drawer/Drawer';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import PlaceIcon from '@material-ui/icons/Place';
import getWarehouseForList from '../../queries/getWarehouseForList';
import { Query } from 'react-apollo';

class Warehouse extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Magazyny
        </Typography>
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
                  <ListItem button key={text.idMagazyn}>
                    <ListItemIcon>
                      <PlaceIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${text.adres.miasto} ${text.adres.ulica} ${text.adres.nrPosesji}`}
                      secondary={`${text.rodzaj}`}
                    />
                  </ListItem>
                ));
              }}
            </Query>
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

Warehouse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(Warehouse);
