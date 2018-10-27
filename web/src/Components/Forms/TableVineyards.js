import React, {Fragment} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TablePagination
} from '@material-ui/core'


export class TableVineyards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 2,
            selected: null,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleRowClick = (event, id) => {
        // this.setState({
        //     selected: id,
        // });
        this.props.onSelect(id);
    };

    isSelected = id => this.state.selected === id;


    render() {
        const {
            page,
            rowsPerPage,
        } = this.state;
        const {
            vineyards,
        } = this.props;


        return (
            <Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa winnicy</TableCell>
                            <TableCell>Powierzchnia</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vineyards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow
                                    hover
                                    selected={this.isSelected(row.id)}
                                    onClick={event => this.handleRowClick(event, row)}
                                    key={row.id}>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.area}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component={"div"}
                    count={vineyards.length}
                    onChangePage={this.handleChangePage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                />
            </Fragment>
        );
    }

}