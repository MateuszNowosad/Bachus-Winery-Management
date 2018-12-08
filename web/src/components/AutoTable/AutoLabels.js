import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableHead from '@material-ui/core/TableHead/TableHead';

const AutoLabels = props => {
  let labels = [];
  console.log('9, props.queryData jakub: ', props.queryData);
  let labelCount;
  if (props.labelsArr === undefined) {
    //previous
    // let record = props.queryData['data'][props.querySubject][0];
    let record = props.queryData[0];
    //not showing _typename field
    for (let property in record)
      if (record.hasOwnProperty(property) && property !== '__typename') {
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
  // previous
  // queryData: PropTypes.object,
  queryData: PropTypes.array,
  // querySubject: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
  labelArr: PropTypes.array,
  labelCountChange: PropTypes.func
};

export default AutoLabels;
