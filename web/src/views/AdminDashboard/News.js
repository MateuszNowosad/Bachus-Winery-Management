import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BackupStyle from "../../assets/jss/common/views/News/BackupStyle.js";
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../components/AutoTable/AutoTable';
import data from '../../variables/AdminDashboard/AutoTableTestData';
import OCBigTab from '../../components/Tab/OCBigTab.js';
import TabContainer from '../../components/Tab/TabContainer';
import getOperations from '../../queries/OperationQueries/getOperations';
import { FormUsers } from '../common/forms/FormUsers';
import getVineyardOperations from '../../queries/VineyardQueries/getVineyardOperations';
import { FormOperations } from '../common/forms/FormOperations';
import { FormVineyardOperation } from '../common/forms/FormVineyardOperation';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';

const labels = ['Ostatnie wydarzenia', 'Ostatnie operacje na partiach', 'Ostatnie na winnicach'];

class News extends React.Component {
  sortOperations = data => {
    return data.sort((a, b) => Number(b.dataZakonczenia) - Number(a.dataZakonczenia));
  };
  sortVineyardOperations = data => {
    return data.sort((a, b) => Number(b.data) - Number(a.data));
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Najnowsze zdarzenia
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
            <AutoTable
              queryData={data}
              querySubject={'hero'}
              querySize={2}
              labelsArr={['ID', 'Nazwa', 'Wiek']}
              editMode={false}
            />
          </TabContainer>
          <TabContainer>
            <Query query={getOperations}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress/>;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let operations = [].concat(data.Operacje);
                operations = this.sortOperations(operations).slice(0, 15);
                return (
                  <AutoTable
                    queryData={operations}
                    // querySubject="hero"
                    querySize={operations.length}
                    dialogForm={<FormOperations/>}
                    dialogFormTitle={'Operacja na partii'}
                    editMode={true}
                    showDetails={true}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Query query={getVineyardOperations}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress/>;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let vineyardOperations = [].concat(data.OperacjeNaWinnicy);
                vineyardOperations = this.sortVineyardOperations(vineyardOperations).slice(0, 15);
                return (
                  <AutoTable
                    queryData={vineyardOperations}
                    // querySubject="hero"
                    querySize={vineyardOperations.length}
                    dialogForm={<FormVineyardOperation/>}
                    dialogFormTitle={'Operacja na winnicy'}
                    editMode={true}
                    showDetails={true}
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

News.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(News);
