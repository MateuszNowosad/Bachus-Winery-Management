import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';

class WarehouseDetails extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Magazyny
        </Typography>
        <p>test {id}</p>
      </React.Fragment>
    );
  }
}

WarehouseDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(AdminDashboardStyle)(WarehouseDetails);
