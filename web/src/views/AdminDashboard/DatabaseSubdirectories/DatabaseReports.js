import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../../components/AutoTable/AutoTable';
import OCBigTab from '../../../components/Tab/OCBigTab.js';
import TabContainer from '../../../components/Tab/TabContainer';
import DataToPDF from '../../../components/DataToPDF/DataToPDF';
import { Query } from 'react-apollo';
import getReports from '../../../queries/ReportsQueries/getReports';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';

const labels = ['Raporty', 'Generuj raport'];

class DatabaseReports extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Baza danych: Systemy wspomagania logistycznego
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Raporty
            </Typography>
            <Query query={getReports}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let reports = data.Raporty;
                return <AutoTable queryData={reports} querySize={reports.length} editMode={false}/>;
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Generuj raport
            </Typography>
            <DataToPDF />
          </TabContainer>
        </OCBigTab>
      </React.Fragment>
    );
  }
}

DatabaseReports.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(DatabaseReports);
