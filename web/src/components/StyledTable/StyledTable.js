import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import AutoContent from "../AutoTable/AutoContent";
import AutoTableStyle from '../../assets/jss/common/components/AutoTableStyle.js'
import LabelGenerator from "./LabelGenerator";

function StyledTable(props) {
    const {classes, queryData, querySubject, labelsArr} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <LabelGenerator labelsArr={labelsArr}/>
                <AutoContent queryData={queryData} querySubject={querySubject}/>
            </Table>
        </Paper>
    );
}

StyledTable.propTypes = {
    classes: PropTypes.object.isRequired,
    queryData: PropTypes.object.isRequired,
    querySubject: PropTypes.string.isRequired,
    labelsArr: PropTypes.array,
};

export default withStyles(AutoTableStyle)(StyledTable);
