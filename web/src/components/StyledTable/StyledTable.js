import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import AutoContent from "../AutoTable/AutoContent";
import AutoTableStyle from '../../assets/jss/common/components/AutoTableStyle.js'
import LabelGenerator from "./LabelGenerator";

function StyledTable(props) {
    const {classes, data, subject, labelsArr} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <LabelGenerator labelsArr={labelsArr}/>
                <AutoContent data={data} subject={subject}/>
            </Table>
        </Paper>
    );
}

StyledTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    subject: PropTypes.string.isRequired,
    labelsArr: PropTypes.array,
};

export default withStyles(AutoTableStyle)(StyledTable);
