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
import getBatches from '../../../queries/BatchesQueries/getBatches';
import getWineInformations from '../../../queries/BatchesQueries/getWineInformations';
import getOperations from '../../../queries/OperationQueries/getOperations';
import getDictBatchType from '../../../queries/DictionaryQueries/getDictBatchType';
import getDictWineCategory from '../../../queries/DictionaryQueries/getDictWineCategory';
import getDictProcesses from '../../../queries/DictionaryQueries/getDictProcesses';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import { FormBatches } from '../../common/forms/FormBatches';
import { FormOperations } from '../../common/forms/FormOperations';
import { FormWineInformation } from '../../common/forms/FormWineInformation';
import { FormDictBatchType } from '../../common/forms/FormDictBatchType';
import { FormDictWineCategory } from '../../common/forms/FormDictWineCategory';
import { FormDictProcesses } from '../../common/forms/FormDictProcesses';

const labels = ['Partie', 'Informacje o winie', 'Operacje', 'Słowniki'];

class DatabaseProduction extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Baza danych: Systemy wspomagania produkcji
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Partie
            </Typography>
            <Query query={getBatches}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let batches = data.Partie;
                return (
                  <AutoTable
                    query={getBatches}
                    queryData={batches}
                    querySize={batches.length}
                    dialogForm={<FormBatches />}
                    dialogFormTitle={'Partia'}
                    editMode={true}
                    showDetails={true}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Informacje o winie
            </Typography>
            <Query query={getWineInformations}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let wineInfo = data.InformacjeOWinie;
                return (
                  <AutoTable
                    query={getWineInformations}
                    queryData={wineInfo}
                    querySize={wineInfo.length}
                    dialogForm={<FormWineInformation />}
                    dialogFormTitle={'Informacja o winie'}
                    editMode={true}
                    showDetails={false}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Operacje
            </Typography>
            <Query query={getOperations}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let operations = data.Operacje;
                return (
                  <AutoTable
                    query={getOperations}
                    queryData={operations}
                    querySize={operations.length}
                    dialogForm={<FormOperations />}
                    dialogFormTitle={'Operacja'}
                    editMode={true}
                    showDetails={false}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h4" gutterBottom component="h1">
              Słowniki
            </Typography>
            <Typography variant="h5" gutterBottom component="h1">
              Typ partii
            </Typography>
            <Query query={getDictBatchType}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let batchTypes = data.DictTypPartii;
                return (
                  <AutoTable
                    query={getDictBatchType}
                    queryData={batchTypes}
                    querySize={batchTypes.length}
                    dialogForm={<FormDictBatchType />}
                    dialogFormTitle={'Typ partii'}
                    editMode={true}
                    showDetails={false}
                  />
                );
              }}
            </Query>
            <Typography variant="h5" gutterBottom component="h1">
              Kategorie wina
            </Typography>
            <Query query={getDictWineCategory}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let wineCategories = data.DictKategoriaWina;
                return (
                  <AutoTable
                    query={getDictWineCategory}
                    queryData={wineCategories}
                    querySize={wineCategories.length}
                    dialogForm={<FormDictWineCategory />}
                    dialogFormTitle={'Kategoria wina'}
                    editMode={true}
                    showDetails={false}
                  />
                );
              }}
            </Query>
            <Typography variant="h5" gutterBottom component="h1">
              Procesy
            </Typography>
            <Query query={getDictProcesses}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let processes = data.DictProcesy;
                return (
                  <AutoTable
                    query={getDictProcesses}
                    queryData={processes}
                    querySize={processes.length}
                    dialogForm={<FormDictProcesses />}
                    dialogFormTitle={'Proces'}
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

DatabaseProduction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(DatabaseProduction);
