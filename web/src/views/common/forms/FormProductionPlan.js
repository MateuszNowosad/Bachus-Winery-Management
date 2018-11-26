import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler.js';
import { usersValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import SelectableAutoTable from "../../../components/SelectableAutoTable/SelectableAutoTable";
import data from "../../../variables/AdminDashboard/AutoTableTestData.js";
import Typography from "@material-ui/core/Typography/Typography";


const errorMap = {
    name: false,
    description: false,
    file: false,
    recipe: false,
};

export class FormProductionPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            file: '',
            recipe: {},
            fileName: '',
            error: errorMap,
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleSelect = (name, object) => {
        this.setState({
            [name]: object
        });
        console.log('43, {[name]: object} Mateusz: ', {[name]: object});
    };
    
    handleSubmit = () => {
        const { name, description, file, recipe } = this.state;

        let dataObject = {
            name,
            description,
            file,
            recipe
        };

        let arrayOfErrors = UniversalValidationHandler(dataObject, usersValidationKeys);
        if (arrayOfErrors.length === 0) {
            if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
        } else {
            let error = Object.assign({}, errorMap);
            for (let errorField in arrayOfErrors) {
                error[arrayOfErrors[errorField]] = true;
            }
            this.setState({ error: error });
            this.props.submitAborted();
        }
    };

    handleFileChange = event => {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                fileName: file.name
            });
        };

        reader.readAsDataURL(file);
    };

    componentDidUpdate(prevProps) {
        if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
            this.handleSubmit();
        }
    }

    render() {
        const { name, description, recipe, error} = this.state;
        console.log('92, recipe Mateusz: ', parseInt(recipe.idAdres, 10));
        return (
            <div>
                <form>
                    <Grid container spacing={8} justify={'center'}>
                        <Grid item md={6}>
                            <TextField
                                fullWidth
                                error={error.name}
                                id="firstName"
                                label="Nazwa"
                                placeholder="Nazwa"
                                value={name}
                                margin="dense"
                                onChange={this.handleChange('name')}
                                variant={'outlined'}
                                inputProps={{
                                    maxLength: '30',
                                    minwidth: '400'
                                }}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                fullWidth
                                error={error.description}
                                id="description"
                                label="Opis"
                                placeholder="Opis"
                                value={description}
                                margin="dense"
                                onChange={this.handleChange('description')}
                                variant={'outlined'}
                                inputProps={{
                                    maxLength: '30'
                                }}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <input hidden accept=".pdf" id="addEDocument" type="file" onChange={this.handleFileChange} />
                            <label htmlFor="addEDocument">
                                <Button variant="contained" component="span">
                                    Dodaj eDokument
                                </Button>
                            </label>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="h4" gutterBottom component="h2">
                            {this.state.fileName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <SelectableAutoTable
                        queryData={data}
                        querySubject="hero"
                        querySize={259}
                        funParam="recipe"
                        onSelect={this.handleSelect}
                        id={parseInt(recipe.idAdres, 10)}
                    />
                </form>
            </div>
        );
    }
}

FormProductionPlan.propTypes = {
    submitFromOutside: PropTypes.bool,
    onSubmit: PropTypes.func,
    formSubmitted: PropTypes.func,
    submitAborted: PropTypes.func
};
