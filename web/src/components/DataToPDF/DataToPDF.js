import React from 'react';
import {Grid, MenuItem, TextField} from '@material-ui/core';
import getAllTablesNames from '../../queries/getAllTablesNames'
import {Query} from 'react-apollo'


export class DataToPDF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: '',
        }

    }

    handleChange = name => event => {
        console.log('18, dziala jakub:  dziala');
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const {table} = this.state;
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
                                        id="table"
                                        select
                                        label="Tabela"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={table}
                                        onChange={this.handleChange('table')}
                                        margin="dense"
                                        variant={'outlined'}
                                    >
                                        {data.__schema.queryType.fields.map(args => (
                                            <MenuItem key={args.name} value={args.name}>
                                                {args.name}
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
                            query={getAllTablesNames}
                        >
                            {({loading, error, data}) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;

                                return (
                                    <TextField
                                        fullWidth
                                        id="table"
                                        select
                                        label="Tabela"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={table}
                                        onChange={this.handleChange('table')}
                                        margin="dense"
                                        variant={'outlined'}
                                    >
                                        {
                                            data.__schema.queryType.fields.map(args => (
                                                <MenuItem key={args.name} value={args.name}>
                                                    {args.name}
                                                </MenuItem>
                                            ))
                                        }
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

