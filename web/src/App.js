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

const user = {
  //TODO testuser should be in variables.
};

const hasRole = (user, roles) =>
  roles.some(role => {
    if (user.roles !== undefined) {
      return user.roles.includes(role);
    } else return false;
  });

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
    error: false
  };

  constructor(props){
    super(props);
    axios({
      method: 'get',
      url: 'http://localhost:8080/usrrole',
      withCredentials: true
    }).then(response => {
      console.log('41, response Mateusz: ', response);
      if (response.data) {
        console.log('43, "Success" Mateusz: ', 'Success');
        this.state.role = response.data.role;
        this.setState({ error: false });
      } else {
        console.log('45, "Error" Mateusz: ', 'Error');
        this.state.error = true;
      }
    });
  }

  render() {
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
              {indexRoutes.map((prop, key) => {
                if (prop.role !== undefined) {
                  if (hasRoleGet(this.state.role, prop.role)) {
                    return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />; //TODO Write PrivateRoute component. Use this to hide routes from drawer.
                  }
                } else return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />;
              })}
              <Redirect to={'/'}/>
            </Switch>
            {user.roles !== undefined && <Redirect from="/" to={'/admindashboard/'} />}
          </MuiThemeProvider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
