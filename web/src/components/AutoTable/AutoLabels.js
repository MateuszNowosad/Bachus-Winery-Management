import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableHead from '@material-ui/core/TableHead/TableHead';
import flattenObject from '../../functions/flattenObject';

const AutoLabels = props => {
  let labels = [];
  console.log('9, props.queryData jakub: ', props.queryData);
  let labelCount;
  if (props.labelsArr === undefined) {
    //previous
    // let record = props.queryData['data'][props.querySubject][0];
    let record = flattenObject(props.queryData[0]);
    //not showing _typename field
    for (let property in record)
      if (record.hasOwnProperty(property)) {
        labels.push(<TableCell key={property}>{property}</TableCell>);
      }
  } else
    for (let len = props.labelsArr.length, i=0; i<len; ++i)
      labels.push(<TableCell key={i}>{props.labelsArr[i]}</TableCell>);


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
