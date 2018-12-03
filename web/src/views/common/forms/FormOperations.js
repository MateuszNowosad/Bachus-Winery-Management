import React from 'react';
import {
    Grid,
    MenuItem,
    TextField,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Button,
    Chip
} from '@material-ui/core';
import {Query} from 'react-apollo'
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UniversalValidationHandler from "./UniversalValidationHandler/UniversalValidationHandler";
import {
    operationsValidationKeys
} from "./UniversalValidationHandler/validationKeys/validationKeys";
import getDictProcesses from "../../../queries/getDictProcesses";
import {DialogForForm} from "./DialogForForm";
import StepperItemFromWarehouse from "./StepperItemFromWarehouse";


const errorMap = {
    beginAmount: false,
    endAmount: false,
    beginDate: false,
    endDate: false,
    alcoholContent: false,
    additiveAmount: false,
    sugarContent: false,
    acidity: false,
    temperature: false,
    desc: false,
    process: false
};

export class FormOperations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beginAmount: '',
            endAmount: '',
            beginDate: currentDate('dateTime'),
            endDate: currentDate('dateTime'),
            alcoholContent: '',
            additiveAmount: '',
            sugarContent: '',
            acidity: '',
            temperature: '',
            desc: '',
            process: '',
            content: [],
            open: false,
            errors: errorMap
        };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleAddContent = data => {
        this.setState(prevState => ({
            content: [...prevState.content, data]
        }));
    };

    handleDelete = data => () => {
        this.setState(state => {
            const content = [...state.content];
            const contentToDelete = content.indexOf(data);
            content.splice(contentToDelete, 1);
            return {content};
        });
    };

    handleSubmit = () => {
        const {
            beginAmount,
            endAmount,
            beginDate,
            endDate,
            alcoholContent,
            additiveAmount,
            sugarContent,
            acidity,
            temperature,
            desc,
            process
        } = this.state;
        let dataObject = {
            beginAmount,
            endAmount,
            beginDate,
            endDate,
            alcoholContent,
            additiveAmount,
            sugarContent,
            acidity,
            temperature,
            desc,
            process
        };

        let arrayOfErrors = UniversalValidationHandler(dataObject, operationsValidationKeys);
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
        const {
            beginAmount,
            endAmount,
            beginDate,
            endDate,
            alcoholContent,
            additiveAmount,
            sugarContent,
            acidity,
            temperature,
            desc,
            process,
            content,
            open,
            errors
        } = this.state;

        return (
            <form style={{margin: '0% 25%'}}>
                <Grid container spacing={8} justify={'center'}>
                    <Grid item md={12}>
                        <Query query={getDictProcesses}>
                            {({loading, error, data}) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;
                                return (
                                    <TextField
                                        fullWidth
                                        error={errors.process}
                                        id="process"
                                        select
                                        label="Rodzaj operacji"
                                        placeholder="Rodzaj operacji"
                                        value={process}
                                        onChange={this.handleChange('process')}
                                        margin="dense"
                                        variant={'outlined'}
                                    >
                                        {data.DictProcesy.map(record => (
                                            <MenuItem key={record.idDictProcesy} value={record.nazwa}>
                                                {record.nazwa}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )
                            }}
                        </Query>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.beginAmount}
                            id="beginAmount"
                            label="Ilość początkowa"
                            value={beginAmount}
                            margin="dense"
                            type="number"
                            onChange={this.handleChange('beginAmount')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.endAmount}
                            id="endAmount"
                            label="Ilość końcowa"
                            value={endAmount}
                            margin="dense"
                            type="number"
                            onChange={this.handleChange('endAmount')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.beginData}
                            id="beginDate"
                            label="Data początku"
                            type="datetime-local"
                            value={beginDate}
                            InputLabelProps={{
                                shrink: true
                            }}
                            margin="dense"
                            onChange={this.handleChange('beginDate')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.endDate}
                            id="endDate"
                            label="Data zakończenia"
                            type="datetime-local"
                            value={endDate}
                            InputLabelProps={{
                                shrink: true
                            }}
                            margin="dense"
                            onChange={this.handleChange('endDate')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.alcoholContent}
                            id="alcoholContent"
                            label="Zawartość alkoholu"
                            value={alcoholContent}
                            margin="dense"
                            type="number"
                            onChange={this.handleChange('alcoholContent')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.additiveAmount}
                            id="additiveAmount"
                            label="Ilość dodatku"
                            value={additiveAmount}
                            margin="dense"
                            type="number"
                            onChange={this.handleChange('additiveAmount')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.sugarContent}
                            id="sugarContent"
                            label="Zawartość cukru"
                            value={sugarContent}
                            margin="dense"
                            type="number"
                            onChange={this.handleChange('sugarContent')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.acidity}
                            id="acidity"
                            label="Kwasowość"
                            value={acidity}
                            margin="dense"
                            type="number"
                            onChange={this.handleChange('acidity')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            error={errors.temperature}
                            id="temperature"
                            label="Temperatura"
                            value={temperature}
                            margin="dense"
                            type="number"
                            onChange={this.handleChange('temperature')}
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            error={errors.desc}
                            id="desc"
                            label="Opis"
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
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography variant="inherit">Produkty z magazynu</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container spacing={8} justify={'center'}>
                                    <Grid item md={12}>
                                        {content.map(data => {
                                            return (
                                                <Chip
                                                    key={data.key}
                                                    label={data.selectedItem.name + ' ' + data.amount}
                                                    onDelete={this.handleDelete(data)}
                                                />
                                            );
                                        })}
                                    </Grid>
                                    <Grid item md={12}>
                                        <Button variant="outlined" onClick={this.handleClickOpen}>
                                            Dodaj
                                        </Button>
                                        <DialogForForm
                                            title={'Magazyn'}
                                            open={open}
                                            onClose={this.handleClose}
                                            children={<StepperItemFromWarehouse onSubmit={this.handleAddContent}
                                                                                onClose={this.handleClose}/>}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

FormOperations.propTypes = {
    submitFromOutside: PropTypes.bool,
    onSubmit: PropTypes.func,
    formSubmitted: PropTypes.func,
    submitAborted: PropTypes.func
};
