import React from 'react'
import {
    Paper,
    TextField,
    Button,
    Grid,
    MenuItem,
    InputAdornment,
    Typography
} from '@material-ui/core'
import {FormAddress} from "./FormAddress";


const types = [
    'magazyn produktów',
    'magazyn półproduktów',
];


export class FormWarehouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            capacity: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        const {type,capacity} = this.state;
        this.props.onSubmit({type,capacity});
    };


    render() {
        const {
            type,
            capacity
        } = this.state;

        return (
            <Paper
                style={{margin: '2% 20%'}}
            >
                <Typography
                    variant={"h6"}
                    align={"center"}
                >
                    Nowy magazyn
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
                                id="type"
                                select
                                label="Rodzaj magazynu"
                                placeholder="Rodzaj magazynu"
                                value={type}
                                onChange={this.handleChange('type')}
                                margin="dense"
                                variant={"outlined"}
                            >
                                {types.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="capacity"
                                label="Pojemność"
                                value={capacity}
                                type="number"
                                margin="dense"
                                onChange={this.handleChange('capacity')}
                                variant={"outlined"}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">m<sub>3</sub></InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <FormAddress/>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={"outlined"}
                                style={{margin: '10% 0 5% 0'}}
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