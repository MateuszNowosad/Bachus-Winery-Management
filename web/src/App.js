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
import NoMatch from "./components/common/NoMatch";
import Redirect from "react-router-dom/es/Redirect";

const user = { //TODO testuser should be in variables.
};

const hasRole = (user, roles) =>
  roles.some(role => {
    if(user.roles !== undefined){
      return user.roles.includes(role);
    }else return false;
  });


const currentTheme = createMuiTheme(standard);

class App extends Component {
  render() {
    // axios.get('/usrrole', {
    //   params: {
    //     id: todoId
    //   }
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     resultElement.innerHTML = generateSuccessHTMLOutput(response);
    //   })
    //   .catch(function (error) {
    //     resultElement.innerHTML = generateErrorHTMLOutput(error);
    //   });
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
                if(prop.role!==undefined){
                  if(hasRole(user, prop.role) ) {
                  return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />; //TODO Write PrivateRoute component. Use this to hide routes from drawer.
                }}else
                  return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />;
              })}
              <Route component={NoMatch} />
            </Switch>
            {user.roles!==undefined && <Redirect
              from="/"
              to={'/admindashboard/'}
            />
            }
          </MuiThemeProvider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
