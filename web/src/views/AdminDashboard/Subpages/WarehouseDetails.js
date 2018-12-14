import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../../components/AutoTable/AutoTable';
import { Query } from 'react-apollo';
import getItemsFromWarehouse from '../../../queries/WarehouseQueries/getItemsFromWarehouse';

class WarehouseDetails extends React.Component {
  render() {
    let warehouseId = this.props.match.params.id;
    return (
      <React.Fragment>
        <Query query={getItemsFromWarehouse(warehouseId)}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log(data.Magazyn);
            return (
              <AutoTable
                queryData={data.Magazyn[0].pozycjaWMagazynie}
                querySize={data.Magazyn[0].pozycjaWMagazynie.length}
                editMode={false}
              />
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

WarehouseDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(WarehouseDetails);
