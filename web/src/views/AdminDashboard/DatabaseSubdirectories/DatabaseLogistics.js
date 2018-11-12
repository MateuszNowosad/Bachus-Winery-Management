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

const labels = ['Pozycje w magazynie', 'Przesyłki', 'Listy przwozowe', 'Magazyny', 'Słowniki'];

class DatabaseProduction extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Baza danych: Systemy wspomagania logistycznego
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Pozycje w magazynie
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Przesyłki
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Listy przwozowe
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Magazyny
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h4" gutterBottom component="h1">
              Słowniki
            </Typography>
            <Typography variant="h5" gutterBottom component="h1">
              Kategorie przedmiotów w magazynie
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
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
