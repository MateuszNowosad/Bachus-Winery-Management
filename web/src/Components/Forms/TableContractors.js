import React, {Fragment} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TablePagination
} from '@material-ui/core'


export class TableContractors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 2,
            selected: this.props.id,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleRowClick = (event, row) => {
        this.props.onSelect(row);
        this.props.onClose();
    };

    isSelected = id => this.state.selected === id;


    render() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        const {
            contractors,
        } = this.props;


        return (
            <Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa kontrahenta</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contractors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow
                                    hover
                                    selected={this.isSelected(row.id)}
                                    onClick={event => this.handleRowClick(event, row)}
                                    key={row.id}>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component={"div"}
                    count={contractors.length}
                    onChangePage={this.handleChangePage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                />
            </Fragment>
        );
    }

}