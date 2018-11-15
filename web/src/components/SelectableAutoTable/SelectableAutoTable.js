import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import AutoLabels from '../AutoTable/AutoLabels';
import SelectableAutoContent from './SelectableAutoContent';
import AutoTableStyle from '../../assets/jss/common/components/AutoTableStyle.js';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase/InputBase';
import TablePaginationActions from '../AutoTable/TablePaginationActions';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableFooter from '@material-ui/core/TableFooter/TableFooter';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import TableCell from '@material-ui/core/TableCell/TableCell';

class SelectableAutoTable extends React.Component {
  state = {
    selected: this.props.id,
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = event => {
    if (event.target.value >= 0)
      this.setState({
        querySize: event.target.value
      });
    if (event.target.value > 5000) {
      this.setState({
        querySize: 5000
      });
    }
  };

  handleRowClick = row => {
    const param = this.props.funParam;
    console.log('35, param jakub: ', param);
    this.props.onSelect(param, row);
    this.props.onClose();
  };

  render() {
    let labelCount = 0;
    let labels = AutoLabels({
      queryData: this.props.queryData,
      querySubject: this.props.querySubject,
      labelsArr: this.props.labelsArr,
      editMode: false,
      labelCountChange: newlabelCount => {
        labelCount = newlabelCount;
      }
    });

    const { classes, queryData, querySubject, querySize, selected } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, querySize - page * rowsPerPage);
    return (
      <div>
        <div className={classes.actions}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Wyszukaj…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            {labels}
            <TableBody>
              <SelectableAutoContent
                queryData={queryData}
                querySubject={querySubject}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={selected}
                onClick={this.handleRowClick}
              />
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={this.state.labelCount} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={this.state.labelCount}
                  count={querySize}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  labelRowsPerPage={'Wiesze na stronę'}
                  rowsPerPageOptions={[5, 25, 100, 250]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>

        {/*<SelectableAutoContent*/}
        {/*queryData={queryData}*/}
        {/*querySubject={querySubject}*/}
        {/*selected={selected}*/}
        {/*onClick={this.handleRowClick}*/}
        {/*/>*/}
      </div>
    );
  }
}

SelectableAutoTable.propTypes = {
  classes: PropTypes.object.isRequired,
  queryData: PropTypes.object.isRequired,
  querySubject: PropTypes.string.isRequired,
  labelsArr: PropTypes.array,
  querySize: PropTypes.number
};

export default withStyles(AutoTableStyle)(SelectableAutoTable);