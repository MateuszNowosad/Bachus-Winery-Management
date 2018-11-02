import React from "react";
import OCAppBar from "../components/AppBar/OCAppBar";
import OCDrawer from "../components/Drawer/OCDrawer";
import {withStyles} from "@material-ui/core";
import AdminDashboardLayoutStyle from "../assets/jss/layout/AdminDashboardLayoutStyle";
import {Redirect, Route, Switch} from "react-router-dom";

import AdminDashboardRoutes from "../routes/AdminDashboardRoutes";
import List from "@material-ui/core/List/List";
import ListItemLink from "../components/Drawer/ListItemLink";

//to prevent unexpected unmounting


const switchRoutes = (
    <Switch>
        {AdminDashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact}/>;
        })}
    </Switch>
);

const drawerList = (
    <List>
        {AdminDashboardRoutes.map((prop, key) => {
            // if (prop.redirect)
            //     return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <ListItemLink to={prop.path} primary={prop.drawerName} icon={prop.drawerIcon} key={key}/>;
        })}
    </List>
);

class AdminDashboardLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: true,
        }
    }

    onDrawerToggle = () => {
        const {drawerOpen} = this.state;
        this.setState({drawerOpen: !drawerOpen});
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <OCAppBar onToggleDrawer={this.onDrawerToggle} drawerOpen={this.state.drawerOpen}/>
                    <OCDrawer onToggleDrawer={this.onDrawerToggle} drawerOpen={this.state.drawerOpen}>
                        {drawerList}
                    </OCDrawer>
                    <div className={classes.content}>
                        <div className={classes.appBarSpacer}/>
                        {switchRoutes}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(AdminDashboardLayoutStyle)(AdminDashboardLayout);