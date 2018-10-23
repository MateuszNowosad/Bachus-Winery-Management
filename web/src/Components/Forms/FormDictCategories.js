import React from 'react'
import {
    Paper,
    TextField,
    Button,
    Grid
} from '@material-ui/core'

export class FormDictCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            unit: '',
            desc: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        const {name,unit,desc} = this.state;
        this.props.onSubmit({name,unit,desc});
    }

    render() {
        const {name, unit, desc} = this.state;
        return (
            <Paper
                style={{margin: '2% 40%'}}
            >
                <form
                    style={{margin: '0% 25%'}}
                >
                    <Grid
                        container
                        spacing={8}
                        justify={"center"}
                    >
                        <Grid item>
                            <TextField
                                id="name"
                                label="Nazwa kategorii"
                                placeholder="Nazwa kategorii"
                                value={name}
                                margin="dense"
                                onChange={this.handleChange('name')}
                                variant={"outlined"}
                                inputProps={{
                                    maxLength: '20'
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="unit"
                                label="Jednostka"
                                placeholder="Jednostka"
                                value={unit}
                                margin="dense"
                                onChange={this.handleChange('unit')}
                                variant={"outlined"}
                                inputProps={{
                                    maxLength: '20'
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="desc"
                                label="Opis kategorii"
                                placeholder="Opis"
                                value={desc}
                                multiline
                                margin="dense"
                                onChange={this.handleChange('desc')}
                                variant={"outlined"}
                                inputProps={{
                                    maxLength: '250'
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant={"outlined"}
                                style={{margin: '5% 0'}}
                                onClick = {this.handleSubmit}
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