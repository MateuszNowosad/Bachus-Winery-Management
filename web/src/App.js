import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Rect Helmet
import { Helmet } from 'react-helmet';
//MaterialUI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
//OC
import { standard } from './assets/jss/themes/standard';

import indexRoutes from './routes/index';
import './App.css';
import NoMatch from './components/common/NoMatch';
import Redirect from 'react-router-dom/es/Redirect';
import axios from 'axios';
import Authorization from './components/Authentication/Authentication';
import Loading from './components/Loading/Loading';
import LoginPage from './views/LoginPage';
import AdminDashboardLayout from './layout/AdminDashboardLayout';

const user = {
  //TODO testuser should be in variables.
};

const hasRoleGet = (usrRole, roles) =>
  roles.some(role => {
    if (usrRole !== undefined) {
      return usrRole === role;
    } else return false;
  });

const currentTheme = createMuiTheme(standard);

class App extends Component {

  state = {
    role: '',
    error: true,
    routeArr: null
  };
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:8080/usrrole',
      withCredentials: true
    }).then(response => {
      console.log('41, response Mateusz: ', response);
      if (response.data) {
        console.log('43, "Success" Mateusz: ', 'Success');
        this.setState({ role: response.data.role, error: false });
      } else {
        console.log('45, "Error" Mateusz: ', 'Error');
        this.setState({ error: true });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.role !== prevState.role) {
    //   let routingTable = indexRoutes.filter(prop => {
    //     if (prop.role !== undefined) {
    //       return hasRoleGet(this.state.role, prop.role);
    //     } else return true;
    //   });
    //   if (routingTable.length) {
    //     this.setState({
    //       routeArr: routingTable,
    //       error: false
    //     });
    //   } else {
    //     this.setState({
    //       error: true
    //     });
    //   }
    // }
    if (this.state.role !== prevState.role) {
      if (hasRoleGet(this.state.role, ['admin', 'useraccounting', 'userwarehouse', 'userproduction', 1])) {
        this.setState({
          routeArr: [],
          error: false
        });
      } else {
        this.setState({
          error: true
        });
      }
    }
  }

  render() {
    let renderMatchWithProps = MatchedComponent  =>
      matchProps => <MatchedComponent  role={this.state.role} error={this.state.error} {...matchProps}/>;
    return (
      <BrowserRouter>
        <React.Fragment>
          <CssBaseline />
          <Helmet>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          </Helmet>
          <MuiThemeProvider theme={currentTheme}>
            <Switch>
              {this.state.routeArr !== null && <Route path={'/admindashboard'} component={renderMatchWithProps(AdminDashboardLayout)} />}
              {/*TODO Write PrivateRoute component. Use this to hide routes from drawer.*/}
              {this.state.routeArr !== null ? (
                <Redirect from="/" to={'/admindashboard'} />
              ) : (
                <Route path={'/'} component={LoginPage} exact={true} />
              )}
              {!this.state.error && <Route component={Loading} />}
              <Route component={NoMatch} />
            </Switch>
          </MuiThemeProvider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
