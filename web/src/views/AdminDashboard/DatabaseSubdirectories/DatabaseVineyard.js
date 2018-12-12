import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BackupStyle from "../../assets/jss/common/views/Database/BackupStyle.js";
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../../components/AutoTable/AutoTable';
import data from '../../../variables/AdminDashboard/AutoTableTestData';
import OCBigTab from '../../../components/Tab/OCBigTab.js';
import TabContainer from '../../../components/Tab/TabContainer';
import getReports from '../../../queries/ReportsQueries/getReports';
import { Query } from 'react-apollo';
import getVineyards from '../../../queries/VineyardQueries/getVineyards';
import getGrapeHarvests from '../../../queries/VineyardQueries/getGrapeHarvests';
import getVineyardOperations from '../../../queries/VineyardQueries/getVineyardOperations';
import getDictVineyardOperations from '../../../queries/DictionaryQueries/getDictVineyardOperations';
import getDictGrapeType from '../../../queries/DictionaryQueries/getDictGrapeType';

const labels = ['Winnice', 'Winobrania', 'Operacje na winnicy', 'Słowniki'];

class DatabaseVineyard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Baza danych: Systemy wspomagania winnic
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Winnice
            </Typography>
            <Query query={getVineyards}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let vineyards = data.Winnica;
                return <AutoTable queryData={vineyards} querySize={vineyards.length} editMode={false} />;
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Winobrania
            </Typography>
            <Query query={getGrapeHarvests}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let grapeHarvests = data.Winobranie;
                return <AutoTable queryData={grapeHarvests} querySize={grapeHarvests.length} editMode={false} />;
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Operacje na winnicy
            </Typography>
            <Query query={getVineyardOperations}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let vineyardOperations = data.OperacjeNaWinnicy;
                return (
                  <AutoTable queryData={vineyardOperations} querySize={vineyardOperations.length} editMode={false} />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Dozwolone operacje na winnicy
            </Typography>
            <Query query={getDictVineyardOperations}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let dictVineyardOperations = data.DictOperacjeNaWinnicy;
                return (
                  <AutoTable
                    queryData={dictVineyardOperations}
                    querySize={dictVineyardOperations.length}
                    editMode={false}
                  />
                );
              }}
            </Query>
            <Typography variant="h5" gutterBottom component="h1">
              Odmiany winogron
            </Typography>
            <Query query={getDictGrapeType}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let grapeTypes = data.DictOdmianaWinogron;
                return <AutoTable queryData={grapeTypes} querySize={grapeTypes.length} editMode={false} />;
              }}
            </Query>
          </TabContainer>
        </OCBigTab>
      </React.Fragment>
    );
  }
}

DatabaseVineyard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(DatabaseVineyard);
