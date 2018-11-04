import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableHead from '@material-ui/core/TableHead/TableHead';

const LabelGenerator = props => {
  let labels = [];
  for (let currLabel in props.labelsArr)
    labels.push(<TableCell key={currLabel}>{props.labelsArr[currLabel]}</TableCell>);

  return (
    <TableHead>
      <TableRow>
        {labels}
        {props.editMode && <TableCell />}
      </TableRow>
    </TableHead>
  );
};

LabelGenerator.propTypes = {
  labelsArr: PropTypes.array,
  editMode: PropTypes.bool.isRequired
};

export default LabelGenerator;
