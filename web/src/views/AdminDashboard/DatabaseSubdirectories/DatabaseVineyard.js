import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BackupStyle from "../../assets/jss/common/views/Database/BackupStyle.js";
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../../components/AutoTable/AutoTable';
import OCBigTab from '../../../components/Tab/OCBigTab.js';
import TabContainer from '../../../components/Tab/TabContainer';
import { Query } from 'react-apollo';
import getVineyards from '../../../queries/VineyardQueries/getVineyards';
import getGrapeHarvests from '../../../queries/VineyardQueries/getGrapeHarvests';
import getVineyardOperations from '../../../queries/VineyardQueries/getVineyardOperations';
import getDictVineyardOperations from '../../../queries/DictionaryQueries/getDictVineyardOperations';
import getDictGrapeType from '../../../queries/DictionaryQueries/getDictGrapeType';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import { FormVineyard } from '../../common/forms/FormVineyard';
import { FormGrapeHarvest } from '../../common/forms/FormGrapeHarvest';
import { FormVineyardOperation } from '../../common/forms/FormVineyardOperation';
import { FormDictVineyardOperations } from '../../common/forms/FormDictVineyardOperations';
import { FormDictGrapeType } from '../../common/forms/FormDictGrapeType';

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
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let vineyards = data.Winnica;
                return (
                  <AutoTable
                    query={getVineyards}
                    queryData={vineyards}
                    querySize={vineyards.length}
                    dialogForm={<FormVineyard />}
                    dialogFormTitle={'Winnica'}
                    editMode={true}
                    showDetails={true}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Winobrania
            </Typography>
            <Query query={getGrapeHarvests}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let grapeHarvests = data.Winobranie;
                return (
                  <AutoTable
                    query={getGrapeHarvests}
                    queryData={grapeHarvests}
                    querySize={grapeHarvests.length}
                    dialogForm={<FormGrapeHarvest />}
                    dialogFormTitle={'Winobranie'}
                    editMode={true}
                    showDetails={true}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Operacje na winnicy
            </Typography>
            <Query query={getVineyardOperations}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let vineyardOperations = data.OperacjeNaWinnicy;
                return (
                  <AutoTable
                    query={getVineyardOperations}
                    queryData={vineyardOperations}
                    querySize={vineyardOperations.length}
                    dialogForm={<FormVineyardOperation />}
                    dialogFormTitle={'Operacja na winnicy'}
                    editMode={true}
                    showDetails={false}
                  />
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
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let dictVineyardOperations = data.DictOperacjeNaWinnicy;
                return (
                  <AutoTable
                    query={getDictVineyardOperations}
                    queryData={dictVineyardOperations}
                    querySize={dictVineyardOperations.length}
                    dialogForm={<FormDictVineyardOperations />}
                    dialogFormTitle={'Dozwolona operacja na winnicy'}
                    editMode={true}
                    showDetails={false}
                  />
                );
              }}
            </Query>
            <Typography variant="h5" gutterBottom component="h1">
              Odmiany winogron
            </Typography>
            <Query query={getDictGrapeType}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let grapeTypes = data.DictOdmianaWinogron;
                return (
                  <AutoTable
                    query={getDictGrapeType}
                    queryData={grapeTypes}
                    querySize={grapeTypes.length}
                    dialogForm={<FormDictGrapeType />}
                    dialogFormTitle={'Odmiana winogron'}
                    editMode={true}
                    showDetails={false}
                  />
                );
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
