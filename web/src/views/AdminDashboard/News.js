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

const labels = ['Ostatnie wydarzenia', 'Ostatnie operacje na partiach', 'Ostatnie na winnicach'];

class News extends React.Component {
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
                    <AutoTable
                        queryData={data}
                        querySubject={'hero'}
                        querySize={2}
                        labelsArr={['ID', 'Nazwa', 'Wiek']}
                        editMode={false}
                    />
                </TabContainer>
                <TabContainer><AutoTable
                    queryData={data}
                    querySubject={'hero'}
                    querySize={2}
                    labelsArr={['ID', 'Nazwa', 'Wiek']}
                    editMode={false}
                /></TabContainer>
            </OCBigTab>
      </React.Fragment>
    );
  }
}

News.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(News);
