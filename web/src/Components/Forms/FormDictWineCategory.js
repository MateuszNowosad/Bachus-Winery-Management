import React from 'react'
import {
    Paper,
    TextField,
    Button,
    Grid
} from '@material-ui/core'

export class FormDictWineCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            desc: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        const {name,desc} = this.state;
        this.props.onSubmit({name,desc});
    };

    render() {
        const {name, desc} = this.state
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
                                label="Nazwa kategorii wina"
                                placeholder="Nazwa kategorii wina"
                                value={name}
                                margin="dense"
                                onChange={this.handleChange('name')}
                                variant={"outlined"}
                                inputProps={{
                                    maxLength: '45'
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="desc"
                                label="Opis kategorii wina"
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
                        <Grid item>
                            <Button
                                variant="outlined"
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