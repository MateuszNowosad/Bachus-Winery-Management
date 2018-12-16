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
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import NoMatch from "./components/common/NoMatch";

const user = { //TODO testuser should be in variables.
  roles: ['user']
};

const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role));


const currentTheme = createMuiTheme(standard);

// const adresyQuery = () => (
//   <Query
//     query={gql`
//       {
//         Adresy {
//           idAdres
//           miasto
//           kodPocztowy
//           kraj
//         }
//       }
//     `}
//   >
//     {({ loading, error, data }) => {
//       if (loading) return <CircularProgress />;
//       if (error) return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
//
//       return data.Adresy.map(args => (
//         <div key={args.idAdres}>
//           <p>{`${args.idAdres}. ${args.miasto} ${args.kodPocztowy}`}</p>
//         </div>
//       ));
//     }}
//   </Query>
// );

class App extends Component {
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
                if(prop.role!==undefined){
                  if(hasRole(user, prop.role) ) {
                  return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />; //TODO Write PrivateRoute component. Use this to hide routes from drawer.
                }}else
                  return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />;
              })}
              <Route component={NoMatch} />
            </Switch>
          </MuiThemeProvider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
