import React from 'react'
import {
    Paper,
    TextField,
    Button,
    Grid,
    MenuItem,
    Typography
} from '@material-ui/core'
import {dictWineCategories} from './StaticData'

export class FormWineInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            motto: '',
            allergens: '',
            energyValue: 0,
            wineCategory: '',
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        const {name,motto,allergens,energyValue, wineCategory} = this.state;
        this.props.onSubmit({name,motto,allergens,energyValue, wineCategory});
    };

    render() {
        const {name, motto, allergens, energyValue, wineCategory} = this.state;
        return (
            <Paper
                style={{margin: '2% 20%'}}
            >
                <Typography
                    variant={"h6"}
                    align={"center"}
                >
                    Nowa informacja o winie
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
                                id="name"
                                label="Nazwa wina"
                                value={name}
                                margin="dense"
                                onChange={this.handleChange('name')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="motto"
                                label="Motto"
                                value={motto}
                                margin="dense"
                                onChange={this.handleChange('motto')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="allergens"
                                label="Zawarte alergeny"
                                value={allergens}
                                margin="dense"
                                onChange={this.handleChange('allergens')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="energyValue"
                                label="Wartość energetyczna"
                                type="number"
                                value={energyValue}
                                margin="dense"
                                onChange={this.handleChange('energyValue')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="motto"
                                label="Motto"
                                value={motto}
                                margin="dense"
                                onChange={this.handleChange('motto')}
                                variant={"outlined"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                id="wineCategory"
                                select
                                label="Kategoria wina"
                                placeholder="Kategoria wina"
                                value={wineCategory}
                                onChange={this.handleChange('wineCategory')}
                                margin="dense"
                                variant={"outlined"}
                            >
                                {dictWineCategories.map(option => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
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