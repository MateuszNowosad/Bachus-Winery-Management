import React from 'react';
import PropTypes from 'prop-types';
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";


const AutoLabels = (props) => {
    let record = props.queryData["data"][props.querySubject][0];
    let labels = [];
    for (let property in record)
        if (record.hasOwnProperty(property)) {
            labels.push(<TableCell key={property}>{property}</TableCell>);
        }
    return (
        <TableHead>
            <TableRow>
                {labels}
            </TableRow>
        </TableHead>
    );
};

AutoLabels.propTypes = {
    queryData: PropTypes.object.isRequired,
    querySubject: PropTypes.string.isRequired,
};

export default AutoLabels;