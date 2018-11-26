import React from 'react';
import PropTypes from 'prop-types';

class TabView extends React.Component {
  state = {
    activeView: 0
  };

  changeTab = (children, value) => {
    if (React.Children.count(children) > value) {
      this.setState({
        activeView: value
      });
    }
  };

  constructor(props) {
    super(props);
    const { children, value } = this.props;
    if (React.Children.count(children) > value) {
      this.state = { activeView: value };
    }
  }

  componentDidUpdate(prevProps) {
    const { children, value } = this.props;
    if (this.props.value !== prevProps.value) {
      this.changeTab(children, value);
    }
  }

  render() {
    const { children } = this.props;
    return children[this.state.activeView];
  }
}

TabView.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number
};

export default TabView;
