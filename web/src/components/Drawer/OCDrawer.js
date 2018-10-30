import React from "react";
import Drawer from "@material-ui/core/Drawer/Drawer";
import classNames from 'classnames';
import PropTypes from 'prop-types';
//icons
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";
import {mainListItems} from "../../variables/ListItems"; //, secondaryListItems
//styles
import {withStyles} from "@material-ui/core";
import OCDrawerStyle from "../../assets/jss/common/components/OCDrawerStyle.js";


class OCDrawer extends React.Component {

    handleClick = () => {
        const {onToggleDrawer} = this.props;
        onToggleDrawer();
    };


    render() {
        const {classes, drawerOpen} = this.props;
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
                }}
                open={drawerOpen}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleClick}
                                className={classNames(
                                    classes.Chevron,
                                    !drawerOpen && classes.ChevronOff,
                                )}
                    >
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
                {/*<Divider />*/}
                {/*<List>{secondaryListItems}</List>*/}
            </Drawer>
        );
    }
}

OCDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(OCDrawerStyle)(OCDrawer);