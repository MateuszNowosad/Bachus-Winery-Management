import React from 'react';
import {
    Grid,
    MenuItem,
    TextField,
    Button,
    List,
    withStyles
} from '@material-ui/core';
import getAllTablesNames from '../../queries/getAllTablesNames'
import {Query, ApolloConsumer} from 'react-apollo'
import getAllTablesFieldNames from "../../queries/getAllTablesFieldsNames";
import PDFShow from "../PDFSchemes/PDFShow";
import PDFFromDataSet from "../PDFSchemes/PDFFromDataSet";
import simpleQueryBuilder from "../../queries/simpleQueryBuilder";
import renderFields from "./renderFields";
import DataToPDFStyle from "../../assets/jss/common/components/DataToPDFStyle";
import pageSizes from "../../variables/DataToPDF/pageSizes";
import pageOrientations from "../../variables/DataToPDF/pageOrientations";


class DataToPDF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableName: '',
            fieldNames: [],
            pageSize: '',
            pageOrientation: '',
            fontSize: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleToggle = value => () => {
        const {fieldNames} = this.state;
        const currentIndex = fieldNames.indexOf(value);
        const newFieldName = [...fieldNames];

        if (currentIndex === -1) {
            newFieldName.push(value);
        } else {
            newFieldName.splice(currentIndex, 1);
        }

        this.setState({
            fieldNames: newFieldName,
        });
    };


    render() {
        const {tableName, fieldNames, pageSize, pageOrientation, fontSize} = this.state;
        const {classes} = this.props;
        return (
            <form className={classes.form}>
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
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
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
                                return (
                                    <List
                                        dense
                                        className={classes.list}
                                    >
                                        {renderFields(filteredData, tableName, fieldNames, this.handleToggle)}
                                    </List>
                                )
                            }}
                        </Query>
                    </Grid>
                    <Grid item md={12}>
                            <TextField
                                fullWidth
                                id="pageSize"
                                select
                                label="Rozmiar strony"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                value={pageSize}
                                onChange={this.handleChange('pageSize')}
                                margin="dense"
                                variant={'outlined'}
                            >
                                {
                                    pageSizes.map(pageSize =>
                                        <MenuItem key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </MenuItem>
                                    )
                                }
                            </TextField>
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            id="pageOrientation"
                            select
                            label="Orientacja strony"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={pageOrientation}
                            onChange={this.handleChange('pageOrientation')}
                            margin="dense"
                            variant={'outlined'}
                        >
                            {
                                pageOrientations.map(pageOrientation =>
                                    <MenuItem key={pageOrientation.en} value={pageOrientation.en}>
                                        {pageOrientation.pl}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            id="fontSize"
                            label="Rozmiar czcionki"
                            InputLabelProps={{
                                shrink: true
                            }}
                            type={'number'}
                            value={fontSize}
                            onChange={this.handleChange('fontSize')}
                            margin="dense"
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <ApolloConsumer>
                            {client => (
                                <Button
                                    variant={"outlined"}
                                    onClick={async () => {
                                        const {data} = await client.query({
                                            query: simpleQueryBuilder(tableName, fieldNames),
                                        });
                                        console.log('131, data[tableName] jakub: ', data[tableName]);
                                        PDFShow(PDFFromDataSet(data[tableName], fieldNames,pageSize, pageOrientation, fontSize))
                                    }}
                                >
                                    Generuj dokument
                                </Button>
                            )}
                        </ApolloConsumer>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(DataToPDFStyle)(DataToPDF);