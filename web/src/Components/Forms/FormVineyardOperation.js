import React from 'react'
import {
    Paper,
    TextField,
    Button,
    Grid,
    MenuItem
} from '@material-ui/core'
import {DialogVineyard} from "./DialogVineyard";


export class FormVineyardOperation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateOfOperation: '',
            desc: '',
            dictOperation: '',
            selectedVineyard: {},
            open: true,
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleVineyardSelect = vineyard => {
        this.setState({
            selectedVineyard: vineyard,
        })
    };

    render() {
        const {
            dateOfOperation,
            desc,
            dictOperation,
            selectedVineyard,
            open
        } = this.state;
        const {
            dictOperations,
            vineyards
        } = this.props;

        return (
            <Paper
                style={{margin: '2% 20%'}}
            >
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
                                id="dateOfOperation"
                                label="Data operacji"
                                type="date"
                                value={dateOfOperation}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                                onChange={this.handleChange('dateOfOperation')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="desc"
                                label="Opis operacji"
                                placeholder="Opis"
                                value={desc}
                                multiline
                                margin="dense"
                                onChange={this.handleChange('desc')}
                                variant={"outlined"}
                                inputProps={{
                                    maxLength: '255'
                                }}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="dictOperation"
                                select
                                label="Operacja"
                                placeholder="Operacja"
                                value={dictOperation}
                                onChange={this.handleChange('dictOperation')}
                                margin="dense"
                                variant={"outlined"}
                            >
                                {dictOperations.map(option => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                id="selectedVineyard"
                                label="Wybrana winnica"
                                value={selectedVineyard.name ? selectedVineyard.name : 'Nie wybrano winnicy'}
                                margin="dense"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                onClick={this.handleClickOpen}
                            />
                            <DialogVineyard
                                open={open}
                                vineyards={vineyards}
                                onClose={this.handleClose}
                                onSelect = {this.handleVineyardSelect}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant={"outlined"}
                                style={{margin: '10% 0 5% 0'}}
                                //onClick={this.handleSubmit}
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