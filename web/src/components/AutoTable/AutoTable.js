import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import AutoLabels from "./AutoLabels";
import AutoContent from "./AutoContent";
import AutoTableStyle from '../../assets/jss/common/components/AutoTableStyle.js'
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase/InputBase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button/Button';
import ScrollableDialogForm from '../ScrollableDialogForm/ScrollableDialogForm';


class AutoTable extends React.Component {
    state = {
        querySize: 100,
        open: false,
    };

    handleChange = event => {
        if (event.target.value >= 0)
            this.setState({
                querySize: event.target.value,
            });
        if (event.target.value > 5000) {
            this.setState({
                querySize: 5000,
            });
        }
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        const {classes, queryData, querySubject, dialogFormTitle, dialogForm} = this.props;
        const {querySize, open} = this.state;

        return (
            <React.Fragment>
                <div className={classes.actions}>
                    <TextField
                        id="querySize"
                        label="Ile wierszy na stronę"
                        value={querySize}
                        onChange={this.handleChange}
                        type="number"
                        className={classes.textField}
                        margin="normal"
                    />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Wyszukaj…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <AutoLabels queryData={queryData} querySubject={querySubject}/>
                        <AutoContent queryData={queryData} querySubject={querySubject}/>
                    </Table>
                </Paper>
                <div className={classes.buttonDiv}>
                    <Button onClick={this.handleOpen}>Dodaj</Button>
                </div>
                <ScrollableDialogForm dialogTitle={dialogFormTitle} isOpen={open}
                                      onClose={() => this.setState({open: false})}>
                    {dialogForm}
                </ScrollableDialogForm>
            </React.Fragment>
        );
    }
}


AutoTable.propTypes = {
    classes: PropTypes.object.isRequired,
    queryData: PropTypes.object.isRequired,
    querySubject: PropTypes.string.isRequired,
    dialogFormTitle: PropTypes.string.isRequired,
    dialogForm: PropTypes.object.isRequired,
};

export default withStyles(AutoTableStyle)(AutoTable);
