import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AutoLabels from "./AutoLabels";
import AutoContent from "./AutoContent";
import AutoTableStyle from '../../assets/jss/common/components/AutoTableStyle.js'

function AutoTable(props) {
    const {classes, data, subject} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <AutoLabels data={data} subject={subject}/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <AutoContent data={data} subject={subject}/>
                </TableBody>
            </Table>
        </Paper>
    );
}

AutoTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    subject: PropTypes.string.isRequired,
};

export default withStyles(AutoTableStyle)(AutoTable);
