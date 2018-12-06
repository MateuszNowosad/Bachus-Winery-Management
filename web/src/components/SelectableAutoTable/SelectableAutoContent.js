import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';

const SelectableAutoContent = props => {
  let row = [];
  props.queryData
    .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
    .map(currElement => {
      let values = Object.values(currElement);
      let cells = [];
      for (let value in values) {
        let uniqueCellID = values[0] + 'cell' + value;
        cells.push(<TableCell key={uniqueCellID}> {values[value]} </TableCell>);
      }
      row.push(
        <TableRow
          hover
          key={values[0]}
          selected={props.selected === values[0]} //TEMP WORKAROUND
          onClick={() => props.onClick(currElement)}
        >
          {cells}
        </TableRow>
      );
    });
  return row;
};

SelectableAutoContent.propTypes = {
  queryData: PropTypes.object.isRequired,
  querySubject: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.string,
  onClick: PropTypes.func
};

export default SelectableAutoContent;
