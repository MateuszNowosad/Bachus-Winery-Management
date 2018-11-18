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
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Winobrania
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Operacje na winnicy
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Dozwolone operacje na winnicy
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
            <Typography variant="h5" gutterBottom component="h1">
              Odmiany winogron
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
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
