import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TreeStyle from '../../assets/jss/common/components/TreeStyle';
import Chip from '@material-ui/core/Chip/Chip';
import Collapse from '@material-ui/core/Collapse/Collapse';
import classNames from 'classnames';

class ChipExpansionPanel extends React.Component {
  state = {
    expanded: false
  };

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  componentDidMount() {
    if (this.props.level === 0) this.setState({ expanded: true });
  }

  render() {
    const { level, id, classes, children } = this.props;
    const { expanded } = this.state;
    return (
      <React.Fragment>
        <Chip
          color="primary"
          label={'Partia o ID: ' + id}
          style={{ marginLeft: level * 50 + 'px' }}
          onClick={this.handleClick}
        />
        <Collapse
          in={expanded}
          classes={{
            wrapperInner: classNames(classes.wrapperInner, {
              [classes.wrapperInner]: level * 50 + 'px'
            })
          }}
        >
          {children}
        </Collapse>
      </React.Fragment>
    );
  }
}

ChipExpansionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.node.isRequired
};

export default withStyles(TreeStyle)(ChipExpansionPanel);
