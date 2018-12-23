import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import DatetimeFields from '../../variables/DateFields/DatetimeFields';
import convertDatetime from '../../functions/convertDatetime';
import flattenObject from '../../functions/flattenObject';

//values changed to entries
//value changed to entrie

const AutoContent = props => {
  let row = [];
  const { editMode } = props;
  //previous
  // props.queryData['data'][props.querySubject]
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
        editMode ? (
          <TableRow
            hover
            key={entries[0][1]}
            onClick={event => props.onClick(event, currElement)}
            selected={props.selected === entries[0][1]}
          >
            {cells}
          </TableRow>
        ) : (
          <TableRow hover key={entries[0][1]}>
            {cells}
          </TableRow>
        )
      );
    });
  return row;
};

AutoContent.propTypes = {
  queryData: PropTypes.array.isRequired,
  editMode: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default AutoContent;
