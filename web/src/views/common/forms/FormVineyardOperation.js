import React from 'react';
import {Grid, MenuItem, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import UniversalValidationHandler from "./UniversalValidationHandler/UniversalValidationHandler";
import {vineyardOperationsValidationKeys} from "./UniversalValidationHandler/validationKeys/validationKeys";
import {Query} from 'react-apollo'
import getDictVineyardOperations from "../../../queries/getDictVineyardOperations";


const errorMap = {
    dateOfOperation: false,
    desc: false,
    dictOperation: false
};

export class FormVineyardOperation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateOfOperation: currentDate('dateTime'),
            desc: '',
            dictOperation: '',
            errors: errorMap
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleSubmit = () => {
        const {dateOfOperation, desc, dictOperation} = this.state;

        let dataObject = {
            dateOfOperation, desc, dictOperation
        };

        let arrayOfErrors = UniversalValidationHandler(dataObject, vineyardOperationsValidationKeys);
        if (arrayOfErrors.length === 0) {
            if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
        } else {
            let error = Object.assign({}, errorMap);
            for (let errorField in arrayOfErrors) {
                error[arrayOfErrors[errorField]] = true;
            }
            this.setState({errors: error});
            this.props.submitAborted();
        }
    };

    componentDidUpdate(prevProps) {
        if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
            this.handleSubmit();
        }
    }

    render() {
        const {dateOfOperation, desc, dictOperation, errors} = this.state;

        return (
            <form style={{margin: '0% 25%'}}>
                <Grid container spacing={8} justify={'center'}>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            error={errors.dateOfOperation}
                            id="dateOfOperation"
                            label="Data operacji"
                            type="datetime-local"
                            value={dateOfOperation}
                            InputLabelProps={{
                                shrink: true
                            }}
                            margin="dense"
                            onChange={this.handleChange('dateOfOperation')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            error={errors.desc}
                            id="desc"
                            label="Opis operacji"
                            placeholder="Opis"
                            value={desc}
                            multiline
                            margin="dense"
                            onChange={this.handleChange('desc')}
                            variant={'outlined'}
                            inputProps={{
                                maxLength: '255'
                            }}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Query
                            query={getDictVineyardOperations}
                        >
                            {({loading, error, data}) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;
                                return (
                                    <TextField
                                        fullWidth
                                        error={errors.dictOperation}
                                        id="dictOperation"
                                        select
                                        label="Operacja"
                                        placeholder="Operacja"
                                        value={dictOperation}
                                        onChange={this.handleChange('dictOperation')}
                                        margin="dense"
                                        variant={'outlined'}
                                    >
                                        {data.DictOperacjeNaWinnicy.map(record => (
                                            <MenuItem key={record.idDictOperacjeNaWinnicy} value={record.nazwa}>
                                                {record.nazwa}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )
                            }}
                        </Query>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

FormVineyardOperation.propTypes = {
    submitFromOutside: PropTypes.bool,
    onSubmit: PropTypes.func,
    formSubmitted: PropTypes.func,
    submitAborted: PropTypes.func
};
