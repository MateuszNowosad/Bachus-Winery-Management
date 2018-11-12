import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { Link } from 'react-router-dom';
import MainListItemsStyle from '../../assets/jss/common/components/MainListItemsStyle.js';

class NestedListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />; //to prevent unexpected unmounting.

  render() {
    const { classes, icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink} className={classes.nested}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText inset primary={primary} />
        </ListItem>
      </li>
    );
  }
}

NestedListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

export default withStyles(MainListItemsStyle)(NestedListItemLink);
