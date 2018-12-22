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
//import './App.css';
import NoMatch from './components/common/NoMatch';
import Redirect from 'react-router-dom/es/Redirect';
import axios from 'axios';
import Loading from './components/common/Loading';
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
    waitingForServer: true,
    routeArr: null
  };

  componentDidMount() {
    this.isAuthenticated();
  }

  isAuthenticated = () => {
    axios({
      method: 'get',
      url: '/usrrole',
      withCredentials: true
    }).then(response => {
      console.log('41, response Mateusz: ', response);
      if (response.data) {
        console.log('43, "Success" Mateusz: ', 'Success');
        this.setState({ role: response.data.role, waitingForServer: false, routeArr: null });
      } else {
        console.log('45, "Error" Mateusz: ', 'Error');
        this.setState({ waitingForServer: true, role: '', routeArr: null });
      }
    });
  };

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
      if (hasRoleGet(this.state.role, [1, 2, 3, 4])) {
        this.setState({
          routeArr: []
        });
      }
      this.setState({
        waitingForServer: false
      });
    }
  }

  render() {
    const { role, waitingForServer, routeArr } = this.state;
    //let renderMatchWithProps = MatchedComponent => matchProps => <MatchedComponent {...matchProps} />;
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
              {console.log('101,  Mateusz: ', routeArr)}
              {routeArr !== null && (
                <Route
                  path={'/admindashboard'}
                  render={props => (
                    <AdminDashboardLayout
                      {...props}
                      role={role}
                      waitingForServer={waitingForServer}
                      isAuthenticated={this.isAuthenticated}
                    />
                  )}
                />
              )}
              {routeArr !== null ? (
                <Redirect from="/" to={'/admindashboard'} />
              ) : (
                <Route
                  path={'/'}
                  render={props => <LoginPage {...props} isAuthenticated={this.isAuthenticated} />}
                  exact={true}
                />
              )}
              {waitingForServer ? <Route component={Loading} /> : <Route component={NoMatch} />}
            </Switch>
          </MuiThemeProvider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
