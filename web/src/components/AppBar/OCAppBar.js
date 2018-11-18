import React from 'react';
import PropTypes from 'prop-types';
//icons
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
//Style
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import OCAppBarStyle from '../../assets/jss/common/components/OCAppBarStyle.js';

class OCAppBar extends React.Component {
  handleClick = () => {
    const { onToggleDrawer } = this.props;
    onToggleDrawer();
  };

  render() {
    const { classes, drawerOpen } = this.props;
    return (
      <React.Fragment>
        <AppBar position="absolute" className={classNames(classes.appBar, drawerOpen && classes.appBarShift)}>
          <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleClick}
              className={classNames(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Panel sterowania
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

OCAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(OCAppBarStyle)(OCAppBar);
