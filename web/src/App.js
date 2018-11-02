import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
//Rect Helmet
import {Helmet} from 'react-helmet';
//MaterialUI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
//OC
import {standard} from "./assets/jss/themes/standard"


import indexRoutes from "./routes/index";

const currentTheme = createMuiTheme(standard);

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <CssBaseline/>
                    <Helmet>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
                        <meta name="viewport"
                              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
                    </Helmet>
                    <MuiThemeProvider theme={currentTheme}>
                        <Switch>
                            {indexRoutes.map((prop, key) => {
                                return <Route path={prop.path} component={prop.component} key={key}
                                              exact={prop.exact}/>;
                            })}
                        </Switch>
                    </MuiThemeProvider>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
