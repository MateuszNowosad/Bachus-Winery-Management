import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';

class WarehouseDetails extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>test {this.props.match.params.id}</p>
      </React.Fragment>
    );
  }
}

WarehouseDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(WarehouseDetails);
