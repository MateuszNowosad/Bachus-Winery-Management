import React from 'react';
import {Grid, MenuItem, TextField} from '@material-ui/core';
import getAllTablesNames from '../../queries/getAllTablesNames'
import {Query} from 'react-apollo'
import getAllTablesFieldNames from "../../queries/getAllTablesFieldsNames";


const renderFields = (data, tableName) => {
    if(tableName !== '' && data.length !== 0)
        return data[0].fields.map(field => (
                <MenuItem key={field.name} value={field.name}>
                    {field.name}
                </MenuItem>
            ));
};


export class DataToPDF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableName: '',
            fieldNames: [],
        }

    }

    handleChange = name => event => {
        console.log('18, dziala jakub:  dziala');
        this.setState({
            [name]: event.target.value
        });
    };

    isTableName= () => {
        return this.state.tableName !== '';
    };

    isFieldName = (data) => {
        return data.length !== 0;
    };
    setPlaceholder = (data) => {
        if(!this.isTableName) return 'Nie wybrano tabeli';
        if(!this.isFieldName(data)) return 'Takiej tabeli nie ma bazie';
        return '';
    };

    render() {
        const {tableName, fieldNames} = this.state;
        return (
            <form style={{margin: '0% 25%'}}>
                <Grid container spacing={8} justify={'center'}>
                    <Grid item md={12}>
                        <Query
                            query={getAllTablesNames}
                        >
                            {({loading, error, data}) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;

                                return (
                                    <TextField
                                        fullWidth
                                        id="tableName"
                                        select
                                        label="Tabela"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={tableName}
                                        onChange={this.handleChange('tableName')}
                                        margin="dense"
                                        variant={'outlined'}
                                    >
                                        {data.__schema.queryType.tables.map(table => (
                                            <MenuItem key={table.name} value={table.name}>
                                                {table.name}
                                            </MenuItem>
                                        ))
                                        }
                                    </TextField>
                                )
                            }}
                        </Query>
                    </Grid>
                    <Grid item md={12}>
                        <Query
                            query={getAllTablesFieldNames}
                        >
                            {({loading, error, data}) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;

                                const filteredData = data.__schema.queryType.tables.filter((table) => (table.name === tableName));
                                console.log('95, filteredData jakub: ', filteredData.length);
                                console.log('95, this.isTableName jakub: ', this.isFieldName(filteredData));
                                return (
                                    <TextField
                                        fullWidth
                                        id="fieldNames"
                                        select={this.isTableName && this.isFieldName(filteredData)}
                                        placeholder={this.setPlaceholder(filteredData)}
                                        disabled={!(this.isTableName && this.isFieldName(filteredData))}
                                        label="Pole"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={fieldNames}
                                        onChange={this.handleChange('fieldNames')}
                                        margin="dense"
                                        variant={'outlined'}
                                    >
                                        {renderFields(filteredData,tableName)}
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

