import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import MediaCard from '../../components/common/MediaCard';
import Button from '@material-ui/core/Button/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AutoTable from '../../components/AutoTable/AutoTable';
import data from '../../variables/AdminDashboard/AutoTableTestData';
import SearchBar from '../../components/common/SearchBar';
import testDataProductionPlan from '../../variables/AdminDashboard/testDataProductionPlan';
import ScrollableDialogForm from '../../components/ScrollableDialogForm/ScrollableDialogForm';
import { FormProductionPlan } from '../common/forms/FormProductionPlan';

class ProductionPlans extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.top}>
          <Typography variant="h4" gutterBottom component="h2">
            Aktywne plany produkcyjne
          </Typography>
          <div className={classes.combo}>
            <SearchBar />
            <Button variant="contained" className={classes.button} onClick={this.handleOpen} color={'primary'}>
              Dodaj nowy plan
            </Button>
            <ScrollableDialogForm
              dialogTitle={'Nowy plan produkcyjny'}
              open={this.state.open}
              closeForm={() => this.setState({ open: false })}
              openForm={() => this.setState({ open: true })}
            >
              <FormProductionPlan />
            </ScrollableDialogForm>
          </div>
        </div>
        <div className={classes.flexSidewaysContainer}>
          {testDataProductionPlan.test.map(currElement => (
            <MediaCard key={currElement.id} heading={currElement.nazwa} contents={currElement.opis} />
          ))}
        </div>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Zakończone plany produkcyjne</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <AutoTable queryData={data} querySubject="hero" querySize={249} editMode={false} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

ProductionPlans.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(ProductionPlans);
