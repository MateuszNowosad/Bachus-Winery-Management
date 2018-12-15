import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import AutoLabels from './AutoLabels';
import AutoContent from './AutoContent';
import AutoTableStyle from '../../assets/jss/common/components/AutoTableStyle.js';
import Button from '@material-ui/core/Button/Button';
import ScrollableDialogForm from '../ScrollableDialogForm/ScrollableDialogForm';
import TablePaginationActions from './TablePaginationActions';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableFooter from '@material-ui/core/TableFooter/TableFooter';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import SearchBar from '../common/SearchBar';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/es/CircularProgress';
import { selectQueryForForm } from '../../queries/FormQueries/selectQueryForForm';

class AutoTable extends React.Component {
  state = {
    open: false,
    openEdit: false,
    page: 0,
    rowsPerPage: 5,
    editForm: ''
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleEdit = recordId => {
    console.log('38, this.props.dialogForm.type.name jakub: ', this.props.dialogForm.type.name);
    console.log('45, recordId Mateusz: ', recordId);
    this.setState({
      openEdit: true,
      editForm: recordId
    });
  };

  handleDeletion = (mutation, recordId) => {
    console.log('45, recordId DEMateusz: ', recordId);
    mutation({ variables: { id: recordId } });
  };

  render() {
    let labelCount = 0;
    let labels = AutoLabels({
      queryData: this.props.queryData,
      // querySubject: this.props.querySubject,
      labelsArr: this.props.labelsArr,
      editMode: this.props.editMode,
      labelCountChange: newlabelCount => {
        labelCount = newlabelCount;
      }
    });
    const { classes, queryData, querySize, dialogFormTitle, dialogForm, editMode, query } = this.props;
    const { open, rowsPerPage, page, editForm, openEdit } = this.state;
    return (
      <div style={{ minWidth: '100%' }}>
        <div className={classes.actions}>
          <SearchBar />
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            {labels}
            <TableBody>
              <AutoContent
                query={query}
                formName={dialogForm.type.name}
                queryData={queryData}
                // querySubject={querySubject}
                editMode={editMode}
                handleEdit={this.handleEdit}
                handleDeletion={this.handleDeletion}
                page={page}
                rowsPerPage={rowsPerPage}
              />
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
        {editMode && (
          <React.Fragment>
            <div className={classes.buttonDiv}>
              <Button onClick={this.handleOpen} color={'primary'} variant={'contained'}>
                Dodaj
              </Button>
            </div>
            <ScrollableDialogForm
              dialogTitle={dialogFormTitle}
              open={open}
              closeForm={() => this.setState({ open: false })}
              openForm={() => this.setState({ open: true })}
            >
              {dialogForm}
            </ScrollableDialogForm>
          </React.Fragment>
        )}
        {editForm && (
          <Query query={selectQueryForForm(dialogForm.type.name, editForm)}>
            {({ loading, error, data }) => {
              if (loading) return <CircularProgress />;
              if (error)
                return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
              return (
                <ScrollableDialogForm
                  dialogTitle={dialogFormTitle}
                  open={openEdit}
                  closeForm={() => this.setState({ openEdit: false, editForm: false })}
                  openForm={() => this.setState({ openEdit: true })}
                >
                  {React.cloneElement(dialogForm, { initState: data })}
                </ScrollableDialogForm>
              );
            }}
          </Query>
        )}
      </div>
    );
  }
}

AutoTable.propTypes = {
  classes: PropTypes.object.isRequired,
  //previous
  // queryData: PropTypes.object.isRequired,
  queryData: PropTypes.array.isRequired,
  //querySubject: PropTypes.string.isRequired,
  dialogFormTitle: PropTypes.string,
  dialogForm: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  labelsArr: PropTypes.array,
  querySize: PropTypes.number
};

export default withStyles(AutoTableStyle)(AutoTable);
