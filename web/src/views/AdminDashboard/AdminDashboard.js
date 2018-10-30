import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExampleChart from '../../variables/AdminDashboard/ExampleChart';


import AdminDashboardStyle from "../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js";
import AutoTable from "../../components/AutoTable/AutoTable";
import data from '../../variables/AdminDashboard/AutoTableTestData';


class AdminDashboard extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Typography variant="h4" gutterBottom component="h2">
                    Zamówienia
                </Typography>
                <Typography component="div" className={classes.chartContainer}>
                    <ExampleChart/>
                </Typography>
                {/*<OCTabs theme={standard} labels={['Użytkownicy', 'Kontrahenci', 'Coś tam jeszcze']}/>*/}
                {/*<AutoTable/>*/}
                {/*<Typography variant="h4" gutterBottom component="h2">*/}
                {/*Produkty*/}
                {/*</Typography>*/}
                <AutoTable data={data} subject='hero'/>
            </React.Fragment>
        );
    }
}

AdminDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(AdminDashboardStyle)(AdminDashboard);