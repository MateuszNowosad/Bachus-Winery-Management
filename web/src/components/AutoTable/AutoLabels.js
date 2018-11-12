import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableHead from '@material-ui/core/TableHead/TableHead';

const AutoLabels = props => {
  let labels = [];
  let labelCount;
  if (props.labelsArr === undefined) {
    let record = props.queryData['data'][props.querySubject][0];
    for (let property in record)
      if (record.hasOwnProperty(property)) {
        labels.push(<TableCell key={property}>{property}</TableCell>);
      }
  } else
    for (let currLabel in props.labelsArr)
      labels.push(<TableCell key={currLabel}>{props.labelsArr[currLabel]}</TableCell>);

  labelCount = labels.length;
  props.editMode && labelCount++;
  props.labelCountChange(labelCount);

  return (
    <TableHead>
      <TableRow>
        {labels}
        {props.editMode && <TableCell />}
      </TableRow>
    </TableHead>
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
