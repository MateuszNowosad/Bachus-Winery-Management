import React from 'react'
import {
    Paper,
    TextField,
    Button,
    Grid,
    InputAdornment,
    Typography
} from '@material-ui/core'

export class FormGrapeHarvest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateOfHarvest: '',
            amount: 0,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        const {dateOfHarvest,amount} = this.state;
        this.props.onSubmit({dateOfHarvest,amount});
    };

    render() {
        const {dateOfHarvest, amount} = this.state;
        return (
            <Paper
                style={{margin: '2% 20%'}}
            >
                <Typography
                    variant={"h6"}
                    align={"center"}
                >
                    Nowe winobranie
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
                                id="dateOfHarvest"
                                label="Data zbioru"
                                type="date"
                                value={dateOfHarvest}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                                onChange={this.handleChange('dateOfHarvest')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="amount"
                                label="Ilość"
                                value={amount}
                                type="number"
                                margin="dense"
                                onChange={this.handleChange('amount')}
                                variant={"outlined"}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                                }}
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