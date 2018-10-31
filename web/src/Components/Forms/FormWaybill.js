import React from 'react'
import {
    Paper,
    TextField,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import {contractors} from './StaticData'
import {DialogForForm} from './DialogForForm'
import {TableContractors} from "./TableContractors";

export class FormWaybill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            driverName: '',
            driverSurname: '',
            comments: '',
            reservations: '',
            file: '',
            selectedContractor: {},
            open: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        const {driverName, driverSurname, comments, reservations, file} = this.state;
        this.props.onSubmit({driverName, driverSurname, comments, reservations, file});
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    handleContractorSelect = vineyard => {
        this.setState({
            selectedContractor: vineyard,
        })
    };
    render() {
        const {driverName, driverSurname, comments, reservations,selectedContractor,open} = this.state;
        return (
            <Paper
                style={{margin: '2% 20%'}}
            >
                <Typography
                    variant={"h6"}
                    align={"center"}
                >
                    Nowy list przewozowy
                </Typography>
                <form
                    style={{margin: '0% 25%'}}
                >
                    <Grid
                        container
                        spacing={8}
                        justify={"center"}
                    >
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="driverName"
                                label="Imię kierowcy"
                                value={driverName}
                                margin="dense"
                                onChange={this.handleChange('driverName')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="driverSurname"
                                label="Nazwisko kierowcy"
                                value={driverSurname}
                                margin="dense"
                                onChange={this.handleChange('driverSurname')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="comments"
                                label="Uwagi przewoźnika"
                                value={comments}
                                margin="dense"
                                onChange={this.handleChange('comments')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="reservations"
                                label="Zastrzeżenia odbiorcy"
                                value={reservations}
                                margin="dense"
                                onChange={this.handleChange('reservations')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <input
                                hidden
                                accept="application/pdf"
                                id="addFile"
                                type="file"
                                //onChange={this.handleFileChange}
                            />
                            <label htmlFor="addImage">
                                <Button variant="raised" component="span">
                                    Dodaj dokument
                                </Button>
                            </label>
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                id="selectedContractor"
                                label="Wybrany kontrahent"
                                value={selectedContractor.name ? selectedContractor.name : 'Nie wybrano kontrahenta'}
                                margin="dense"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                onClick={this.handleClickOpen}
                            />
                            <DialogForForm
                                title={"Kontrahenci"}
                                open={open}
                                onClose={this.handleClose}
                                onSelect={this.handleContractorSelect}
                                children={
                                    <TableContractors
                                        contractors={contractors}
                                        id={selectedContractor.id}
                                        onClose={this.handleClose}
                                        onSelect={this.handleContractorSelect}
                                    />}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant={"outlined"}
                                style={{margin: '5% 0'}}
                                onClick={this.handleSubmit}
                            >
                                Dodaj
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}