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
  //previous
  // let record = props.queryData['data'][props.querySubject][0];
  let record = flattenObject(props.queryData[0]);
  //not showing _typename field
  for (let property in record)
    if (record.hasOwnProperty(property)) {
      if (props.labelsObj !== undefined) {
        if (props.labelsObj.hasOwnProperty(property)) {
          labels.push(<TableCell key={property}>{props.labelsObj[property]}</TableCell>);
        } else {
          labels.push(<TableCell key={property}>{property}</TableCell>);
        }
      } else labels.push(<TableCell key={property}>{property}</TableCell>);
    }

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
  labelsObj: PropTypes.object,
  labelCountChange: PropTypes.func
};

export default AutoLabels;
