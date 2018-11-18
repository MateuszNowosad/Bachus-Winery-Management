import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BackupStyle from "../../assets/jss/common/views/Backup/BackupStyle.js";
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../components/AutoTable/AutoTable';
import data from '../../variables/AdminDashboard/AutoTableTestData';
import OCBigTab from '../../components/Tab/OCBigTab.js';
import TabContainer from '../../components/Tab/TabContainer';

const labels = ['Kopie przyrostowe', 'Kopie pełne', 'Akcje'];

class Backup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Kopie bezpieczeństwa
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
            <AutoTable data={data} subject="hero" />
          </TabContainer>
          <TabContainer>
            <AutoTable data={data} subject="hero" />
          </TabContainer>
        </OCBigTab>
      </React.Fragment>
    );
  }
}

Backup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(Backup);
