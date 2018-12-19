import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import MainListItemsStyle from '../../assets/jss/common/components/MainListItemsStyle.js';
import NestedListItemLink from './NestedlistItemLink';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
class ExpandableListItem extends React.Component {
  state = {
    open: true
  };

  componentDidMount() {
    this.setState({ childLinkList: this.childLinksRender });
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  childLinksRender = this.props.childRoutes.map((props, key) => (
    <NestedListItemLink icon={props.drawerIcon} primary={props.drawerName} to={props.path} key={key} />
  ));

  render() {
    const { icon, primary } = this.props;
    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.childLinksRender}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

ExpandableListItem.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  childRoutes: PropTypes.array
};

export default withStyles(MainListItemsStyle)(ExpandableListItem);
