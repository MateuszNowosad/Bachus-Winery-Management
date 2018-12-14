import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { Link } from 'react-router-dom';

class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />; //to prevent unexpected unmounting.

  render() {
    const { icon, primary, secondary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          {secondary !== undefined ? (
            <ListItemText primary={primary} secondary={secondary} />
          ) : (
            <ListItemText primary={primary} />
          )}
        </ListItem>
      </li>
    );
  }
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  secondary: PropTypes.node,
  to: PropTypes.string.isRequired,
  nested: PropTypes.bool
};

export default ListItemLink;
