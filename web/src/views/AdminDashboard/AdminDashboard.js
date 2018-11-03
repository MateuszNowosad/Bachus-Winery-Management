import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExampleChart from '../../variables/AdminDashboard/ExampleChart';
import ExampleTable from '../../variables/AdminDashboard/ExampleTable';


import AdminDashboardStyle from "../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js";
import AutoTable from "../../components/AutoTable/AutoTable";
import data from '../../variables/AdminDashboard/AutoTableTestData';
import OCBigTab from '../../components/Tab/OCBigTab.js';
import TabContainer from "../../components/Tab/TabContainer";
import StyledTable from "../../components/StyledTable/StyledTable";

import {FormUsers} from "../common/forms/FormUsers";


const labels = ['1', '2', '3', '4', '5', '6', '7'];

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
                <OCBigTab labels={labels}>
                    <TabContainer><ExampleTable/></TabContainer>
                    <TabContainer><AutoTable dialogFormTitle={"Nowy użytkownik"} queryData={data} querySubject='hero'
                                             dialogForm={<FormUsers/>}/></TabContainer>
                    <TabContainer>Item Three</TabContainer>
                    <TabContainer>Item Four</TabContainer>
                    <TabContainer>Item Five</TabContainer>
                    <TabContainer>Item Six</TabContainer>
                    <TabContainer>Item Seven</TabContainer>
                </OCBigTab>
                {/*<AutoTable/>*/}
                {/*<Typography variant="h4" gutterBottom component="h2">*/}
                {/*Produkty*/}
                {/*</Typography>*/}
                <AutoTable dialogFormTitle={"Nowy użytkownik"} queryData={data} querySubject='hero'
                           dialogForm={<FormUsers/>}/>
                <StyledTable data={data} subject={'hero'} labelsArr={['ID', 'Nazwa', 'Wiek']}/>
            </React.Fragment>
        );
    }
}

AdminDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(AdminDashboardStyle)(AdminDashboard);