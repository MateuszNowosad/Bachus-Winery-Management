import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';

const AutoLabels = props => {
  let labels = [];
  if (props.labelArr === undefined) {
    let record = props.queryData['data'][props.querySubject][0];
    for (let property in record)
      if (record.hasOwnProperty(property)) {
        labels.push(<TableCell key={property}>{property}</TableCell>);
      }
  } else
    for (let currLabel in props.labelsArr)
      labels.push(<TableCell key={currLabel}>{props.labelsArr[currLabel]}</TableCell>);
  props.labelCountChange(labels.length + (props.editMode ? 1 : 0));
  return (
    <TableRow>
      {labels}
      {props.editMode && <TableCell />}
    </TableRow>
  );
};

AutoLabels.propTypes = {
  queryData: PropTypes.object,
  querySubject: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
  labelArr: PropTypes.array,
  labelCountChange: PropTypes.func
};

export default AutoLabels;
