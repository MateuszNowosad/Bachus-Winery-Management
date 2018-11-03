import React from 'react';
import PropTypes from 'prop-types';
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";


const AutoContent = (props) => {
    let row = [];
    props.queryData["data"][props.querySubject].map(currElement => {
        let values = Object.values(currElement);
        let cells = [];
        for (let value in values) {
            let uniqueCellID = values[0] + 'cell' + value;
            cells.push(<TableCell key={uniqueCellID}> {values[value]} </TableCell>);
        }
        row.push(<TableRow key={values[0]}>{cells}</TableRow>);
    });
    return (
        <TableBody>
            {row}
        </TableBody>
    );
};

AutoContent.propTypes = {
    queryData: PropTypes.object.isRequired,
    querySubject: PropTypes.string.isRequired,
};

export default AutoContent;