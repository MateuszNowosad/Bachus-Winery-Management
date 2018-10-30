import React from 'react';
import PropTypes from 'prop-types';
import TableCell from "@material-ui/core/TableCell/TableCell";


const AutoLabels = (props) => {
    let record = props.data["data"][props.subject][0];
    let labels = [];
    for (let property in record)
        if (record.hasOwnProperty(property)) {
            labels.push(<TableCell key={property}>{property}</TableCell>);
        }
    return labels;
};

AutoLabels.propTypes = {
    data: PropTypes.object.isRequired,
    subject: PropTypes.string.isRequired,
};

export default AutoLabels;