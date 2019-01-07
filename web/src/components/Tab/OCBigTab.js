import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabView from './TabView';

class OCBigTab extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { labels, children } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            scrollButtons="auto"
          >
            {labels.map((currElement, index) => (
              <Tab key={index} value={index} label={currElement} />
            ))}
          </Tabs>
        </AppBar>
        <TabView value={value}>{children}</TabView>
      </React.Fragment>
    );
  }
}

OCBigTab.propTypes = {
  labels: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired
};

export default OCBigTab;
