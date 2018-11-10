import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExampleChart from '../../variables/AdminDashboard/ExampleChart';

import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../components/AutoTable/AutoTable';
import data from '../../variables/AdminDashboard/AutoTableTestData';
import OCBigTab from '../../components/Tab/OCBigTab.js';
import TabContainer from '../../components/Tab/TabContainer';

import { formTitle, FormUsers } from '../common/forms/FormUsers';

const labels = ['Ostatnie wydarzenia', 'Plany produkcyjne', 'Ostatnie operacje na partiach', 'Ostatnie na winnicach'];

class AdminDashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Zamówienia
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <ExampleChart />
        </Typography>
        {/*<OCTabs theme={standard} labels={['Użytkownicy', 'Kontrahenci', 'Coś tam jeszcze']}/>*/}
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
          <TabContainer><AutoTable
              queryData={data}
              querySubject={'hero'}
              querySize={2}
              labelsArr={['ID', 'Nazwa', 'Wiek']}
              editMode={false}
          /></TabContainer>
        </OCBigTab>
        <Typography variant="h4" gutterBottom component="h2">
        Najnowsze zamówienia
        </Typography>
          <AutoTable
              queryData={data}
              querySubject={'hero'}
              querySize={2}
              labelsArr={['ID', 'Nazwa', 'Wiek']}
              editMode={false}
          />
      </React.Fragment>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(AdminDashboard);
