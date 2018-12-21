import React from 'react';
import OCAppBar from '../components/AppBar/OCAppBar';
import OCDrawer from '../components/Drawer/OCDrawer';
import { withStyles } from '@material-ui/core/styles';
import AdminDashboardLayoutStyle from '../assets/jss/layout/AdminDashboardLayoutStyle';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdminDashboardRoutes from '../routes/AdminDashboardRoutes';
import List from '@material-ui/core/List/List';
import ListItemLink from '../components/Drawer/ListItemLink';
import ExpandableListItem from '../components/Drawer/ExpandableListItem';
import axios from 'axios';
import indexRoutes from '../routes';
import PropTypes from 'prop-types';
import { FormProductionPlan } from '../views/common/forms/FormProductionPlan';
import Loading from '../components/common/Loading';
import NoMatch from '../components/common/NoMatch';

//to prevent unexpected unmounting

class AdminDashboardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
      role: this.props.role
    };
  }

  hasRoleGet = (usrRole, roles) =>
    roles.some(role => {
      if (usrRole !== undefined) {
        return usrRole === role;
      } else return false;
    });

  filteredRoutes = AdminDashboardRoutes.filter(prop => {
    //Should be recurrent function, no time
    if (prop.hasOwnProperty('role')) {
      return this.hasRoleGet(this.props.role, prop.role);
    } else return true;
  });

  switchRoutes = (
    <Switch>
      {this.filteredRoutes.map((prop, key) => {
        if (prop.redirect) return <Redirect from={prop.path} to={prop.to} key={key} />;
        if (prop.hasOwnProperty('hidden'))
          return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />;
        let result = [<Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />];
        if (prop.hasOwnProperty('childRoutes')) {
          prop.childRoutes
            .filter(propChild => {
              if (propChild.hasOwnProperty('role')) {
                return this.hasRoleGet(this.props.role, propChild.role);
              } else return true;
            })
            .map((propChild, propKey) => {
              result.push(
                <Route path={propChild.path} component={propChild.component} key={propKey} exact={propChild.exact} />
              );
            });
        }
        return result;
      })}
      {this.props.waitingForServer ? <Route component={Loading} /> : <Route component={NoMatch} />}
    </Switch>
  );

  drawerList = (
    <List>
      {this.filteredRoutes.map((prop, key) => {
        // if (prop.redirect)
        //     return <Redirect from={prop.path} to={prop.to} key={key}/>;
        if (prop.hasOwnProperty('hidden')) return;
        if (prop.hasOwnProperty('childRoutes')) {
          return (
            <ExpandableListItem
              primary={prop.drawerName}
              icon={prop.drawerIcon}
              key={key}
              childRoutes={prop.childRoutes.filter(propChild => {
                if (propChild.hasOwnProperty('role')) {
                  return this.hasRoleGet(this.props.role, propChild.role);
                } else return true;
              })}
            />
          );
        } else return <ListItemLink to={prop.path} primary={prop.drawerName} icon={prop.drawerIcon} key={key} />;
      })}
    </List>
  );

  onDrawerToggle = () => {
    const { drawerOpen } = this.state;
    this.setState({ drawerOpen: !drawerOpen });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <OCAppBar onToggleDrawer={this.onDrawerToggle} drawerOpen={this.state.drawerOpen} isAuthenticated={this.props.isAuthenticated} />
          <OCDrawer onToggleDrawer={this.onDrawerToggle} drawerOpen={this.state.drawerOpen}>
            {this.drawerList}
          </OCDrawer>
          <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            {this.switchRoutes}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AdminDashboardLayout.propTypes = {
  role: PropTypes.number.isRequired,
  waitingForServer: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.func.isRequired
};

export default withStyles(AdminDashboardLayoutStyle)(AdminDashboardLayout);
