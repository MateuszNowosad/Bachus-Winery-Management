import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import DatetimeFields from '../../variables/DateFields/DatetimeFields';
import convertDatetime from '../../functions/convertDatetime';
import flattenObject from '../../functions/flattenObject';

const SelectableAutoContent = props => {
  let row = [];
  props.queryData
    .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
    .map(currElement => {
      let entries = Object.entries(flattenObject(currElement));
      let cells = [];
      for (let entrie in entries) {
        let value = entries[entrie][1];
        if (DatetimeFields.includes(entries[entrie][0])) {
          value = convertDatetime(value);
        }
        let uniqueCellID = entries[0][1] + 'cell' + entrie;
        cells.push(<TableCell key={uniqueCellID}> {value} </TableCell>);
      }
      row.push(
        <TableRow
          hover
          key={entries[0][1]}
          selected={props.selected === entries[0][1]} //TEMP WORKAROUND
          onClick={() => props.onClick(currElement)}
        >
          {cells}
        </TableRow>
      );
    });
  return row;
};

SelectableAutoContent.propTypes = {
  queryData: PropTypes.array.isRequired,
  // querySubject: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.string,
  onClick: PropTypes.func
};

export default SelectableAutoContent;
