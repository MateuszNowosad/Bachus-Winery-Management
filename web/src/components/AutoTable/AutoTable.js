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
import { Mutation, Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/es/CircularProgress';
import { selectQueryForForm } from '../../queries/FormQueries/selectQueryForForm';
import SelectableAutoContent from '../SelectableAutoTable/SelectableAutoContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { selectDeleteForForm } from '../../mutations/FormMutations/selectDeleteForForm';
import DetailsDialog from '../DetailsDialog/DetailsDialog';
import { selectQueryForDetails } from '../../queries/DetailsQueries/selectQueryForDetails';

class AutoTable extends React.Component {
  state = {
    open: false,
    openEdit: false,
    openDetails: false,
    page: 0,
    rowsPerPage: 5,
    anchorEl: null,
    clickedRowId: null
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

  handleDetails = recordId => {
    this.handleMenuClose();
    this.setState({
      openDetails: true,
      clickedRowId: recordId
    },() => console.log('54,  jakub: setState'));
  };

  handleEdit = recordId => {
    console.log('45, recordId Mateusz: ', recordId);
    this.handleMenuClose();
    this.setState({
      openEdit: true,
      clickedRowId: recordId
    });
  };

  handleDeletion = (mutation, recordId) => {
    console.log('45, recordId DEMateusz: ', recordId);
    this.handleMenuClose();
    mutation({ variables: { id: recordId } });
  };

  handleRowClick = (event, row) => {
    console.log('60, row jakub: ', row);
    this.setState({
      anchorEl: event.target,
      clickedRowId: row[Object.keys(row)[0]]
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
      clickedRowId: null
    });
  };

  render() {
    let labelCount = 0;
    let labels = AutoLabels({
      queryData: this.props.queryData,
      // querySubject: this.props.querySubject,
      labelsArr: this.props.labelsArr,
      // editMode: this.props.editMode,
      labelCountChange: newlabelCount => {
        labelCount = newlabelCount;
      }
    });
    const { classes, queryData, querySize, dialogFormTitle, dialogForm, editMode, query } = this.props;
    const { open, rowsPerPage, page, clickedRowId, openEdit, anchorEl, openDetails } = this.state;
    return (
      <div style={{ minWidth: '100%' }}>
        <div className={classes.actions}>
          <SearchBar/>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            {labels}
            <TableBody>
              <AutoContent
                // query={editMode && query}
                // formName={editMode && dialogForm.type.name}
                queryData={queryData}
                // querySubject={querySubject}
                editMode={editMode}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={editMode ? clickedRowId : undefined}
                onClick={editMode ? this.handleRowClick : undefined}
              />
              {editMode && (
                <Menu id="row_menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
                  <MenuItem onClick={() => this.handleDetails(clickedRowId)}>Szczegóły</MenuItem>
                  <MenuItem onClick={() => this.handleEdit(clickedRowId)}>Edytuj</MenuItem>
                  <Mutation
                    key={dialogForm.type.name}
                    mutation={selectDeleteForForm(dialogForm.type.name)}
                    refetchQueries={[{ query: query }]}
                  >
                    {mutation => (
                      <MenuItem onClick={() => this.handleDeletion(mutation,clickedRowId)}>Usuń</MenuItem>
                    )}
                  </Mutation>
                </Menu>
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
        {editMode && (
          <React.Fragment>
            <div className={classes.buttonDiv}>
              <Button onClick={this.handleOpen} color={'primary'} variant={'contained'}>
                Dodaj
              </Button>
            </div>
            <ScrollableDialogForm
              query={editMode && query}
              dialogTitle={dialogFormTitle}
              open={open}
              closeForm={() => this.setState({ open: false })}
              openForm={() => this.setState({ open: true })}
            >
              {dialogForm}
            </ScrollableDialogForm>
          </React.Fragment>
        )}
        {openEdit && (
          <Query query={selectQueryForForm(dialogForm.type.name)} variables={{ id: clickedRowId, idFK: clickedRowId }}>
            {({ loading, error, data }) => {
              if (loading) return <CircularProgress/>;
              if (error)
                return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
              return (
                <ScrollableDialogForm
                  query={editMode && query}
                  dialogTitle={dialogFormTitle}
                  open={openEdit}
                  closeForm={() => this.setState({ openEdit: false, clickedRowId: false })}
                  openForm={() => this.setState({ openEdit: true })}
                >
                  {React.cloneElement(dialogForm, { initState: data })}
                </ScrollableDialogForm>
              );
            }}
          </Query>
        )}
        {openDetails && (
          <Query query={selectQueryForDetails(dialogForm.type.name)} variables={{ id: clickedRowId, idFK: clickedRowId }}>
            {({ loading, error, data }) => {
              if (loading) return <CircularProgress/>;
              if (error)
                return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
              return (
                <DetailsDialog
                  dialogTitle={'Szczegóły'}
                  queryData={data}
                  dataType={dialogForm.type.name}
                  onClose = {() => this.setState({ openDetails: false, clickedRowId: false })}
                  open={openDetails}/>
              );
            }}
          </Query>
        )
        }
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
