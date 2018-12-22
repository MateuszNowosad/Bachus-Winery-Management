import React from 'react';
import PropTypes from 'prop-types';
//icons
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
//Style
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import OCAppBarStyle from '../../assets/jss/common/components/OCAppBarStyle.js';
import Link from 'react-router-dom/es/Link';
import Arrow from '@material-ui/icons/ArrowBack';
import axios from 'axios';

class OCAppBar extends React.Component {
  handleClick = () => {
    const { onToggleDrawer } = this.props;
    onToggleDrawer();
  };

  logout = () => {
    axios({
      method: 'post',
      url: '/usrlogout',
      data: {},
      withCredentials: true
    }).then(response => {
      console.log('41, response Mateusz: ', response);
      if (response.data) {
        console.log('43, "Success" Mateusz: ', 'Success');
        this.props.isAuthenticated();
      } else {
        console.log('45, "Error" Mateusz: ', 'Error');
      }
    });
  };

  render() {
    const profileLink = props => <Link to="/admindashboard/profile" {...props} />;
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
            <IconButton color="inherit" component={profileLink}>
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" onClick={this.logout}>
              <Arrow />
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

OCAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.func.isRequired
};

export default withStyles(OCAppBarStyle)(OCAppBar);
