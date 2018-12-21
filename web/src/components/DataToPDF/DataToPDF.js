import React from 'react';
import { Grid, MenuItem, TextField, Button, List, withStyles } from '@material-ui/core';
import getAllTablesNames from '../../queries/SchemaQueries/getAllTablesNames';
import { Query, ApolloConsumer, Mutation } from 'react-apollo';
import getAllTablesFieldNames from '../../queries/SchemaQueries/getAllTablesFieldsNames';
import PDFShow from '../PDFSchemes/PDFShow';
import PDFFromDataSet from '../PDFSchemes/PDFFromDataSet';
import simpleQueryBuilder from '../../queries/simpleQueryBuilder';
import renderFields from './renderFields';
import DataToPDFStyle from '../../assets/jss/common/components/DataToPDFStyle';
import pageSizes from '../../variables/DataToPDF/pageSizes';
import pageOrientations from '../../variables/DataToPDF/pageOrientations';
import PDFDownload from '../PDFSchemes/PDFDownload';
import UniversalValidationHandler from '../../views/common/forms/UniversalValidationHandler/UniversalValidationHandler';
import { dataToPDFValidationKeys } from '../../views/common/forms/UniversalValidationHandler/validationKeys/validationKeys';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import CreatePDF from '../PDFSchemes/CreatePDF';
import { reportFK, upsertReport } from '../../mutations/FormMutations/upsertMutations';
import currentDate from '../../views/common/forms/CurrentDate';

const errorMap = {
  title: false,
  tableName: false,
  fieldNames: false
};

class DataToPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tableName: '',
      fieldNames: [],
      pageSize: 'A4',
      pageOrientation: 'portrait',
      fontSize: 10,
      errors: errorMap
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleToggle = (value, nestedValue, nested) => () => {
    const { fieldNames } = this.state;
    const newFieldName = [...fieldNames];

    if (nested === true) {
      let currentIndex = fieldNames.findIndex(i => i[value.name]);

      if (currentIndex === -1) {
        newFieldName.push({ [value.name]: [nestedValue] });
      } else {
        let nestedFieldNames = newFieldName[currentIndex][value.name];
        let currentNestedIndex = nestedFieldNames.indexOf(nestedValue);
        if (currentNestedIndex === -1) {
          nestedFieldNames.push(nestedValue);
        } else {
          nestedFieldNames.splice(currentNestedIndex, 1);
          if (nestedFieldNames.length === 0) newFieldName.splice(currentIndex, 1);
        }
      }
    } else {
      let currentIndex = fieldNames.indexOf(value);

      if (currentIndex === -1) {
        newFieldName.push(value);
      } else {
        newFieldName.splice(currentIndex, 1);
      }
    }

    this.setState({
      fieldNames: newFieldName
    });
  };

  fieldToLabels = fields => {
    let labels = [];
    fields.map(field => {
      if (field instanceof Object) {
        labels.push(Object.values(field)[0]);
      } else labels.push(field);
    });
    return labels;
  };

  generateFile = (client, action) => async () => {
    const { tableName, fieldNames, pageSize, pageOrientation, fontSize, title } = this.state;
    let dataObject = {
      title,
      tableName,
      fieldNames: fieldNames.length
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, dataToPDFValidationKeys);
    if (arrayOfErrors.length === 0) {
      const { data } = await client.query({
        query: simpleQueryBuilder(tableName, fieldNames)
      });
      let labels = this.fieldToLabels(fieldNames);
      if (action === 'show')
        PDFShow(PDFFromDataSet(data[tableName], labels, pageSize, pageOrientation, fontSize, title));
      if (action === 'download')
        CreatePDF(PDFFromDataSet(data[tableName], labels, pageSize, pageOrientation, fontSize, title), 'raport')
          .then(results =>
            this.setState({
              fileURL: results
            })
        );
    } else {
      let error = Object.assign({}, errorMap);
      for (let errorField in arrayOfErrors) {
        error[arrayOfErrors[errorField]] = true;
      }
      this.setState({ errors: error });
    }
  };

  render() {
    const { tableName, fieldNames, pageSize, pageOrientation, fontSize, title, errors, fileURL } = this.state;
    const { classes } = this.props;
    return (
      <form className={classes.form}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <Query query={getAllTablesNames}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress/>;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;

                return (
                  <TextField
                    fullWidth
                    id="tableName"
                    required
                    error={errors.tableName}
                    select
                    label="Tabela"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
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
                    ))}
                  </TextField>
                );
              }}
            </Query>
          </Grid>
          <Grid item md={12}>
            <Query query={getAllTablesFieldNames}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress/>;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;

                const filteredData = data.__schema.tables.filter(table => table.name === tableName);
                return (
                  <List dense className={classNames({ [classes.list]: true, [classes.error]: errors.fieldNames })}>
                    {renderFields(filteredData, tableName, fieldNames, this.handleToggle, classes)}
                  </List>
                );
              }}
            </Query>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              required
              error={errors.title}
              id="title"
              label="Tytuł dokumentu"
              placeholder="Tytuł"
              value={title}
              onChange={this.handleChange('title')}
              margin="dense"
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={4}>
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
                  className: classes.menu
                }
              }}
              value={pageSize}
              onChange={this.handleChange('pageSize')}
              margin="dense"
              variant={'outlined'}
            >
              {pageSizes.map(pageSize => (
                <MenuItem key={pageSize} value={pageSize}>
                  {pageSize}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={4}>
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
              {pageOrientations.map(pageOrientation => (
                <MenuItem key={pageOrientation.en} value={pageOrientation.en}>
                  {pageOrientation.pl}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={4}>
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
                <Button variant={'outlined'} onClick={this.generateFile(client, 'show')}>
                  Podgląd
                </Button>
              )}
            </ApolloConsumer>
          </Grid>
          <Grid item md={12}>
            <ApolloConsumer>
              {client => (
                <Button variant={'outlined'} onClick={this.generateFile(client, 'download')}>
                  Generuj Dokument
                </Button>
              )}
            </ApolloConsumer>
          <Mutation mutation={reportFK}>
            {mutate => (
              <Mutation
                mutation={upsertReport}
                onCompleted={result => {
                  console.log('282, result jakub: ', result);
                  mutate({ variables: { reportId: result.upsertRaporty.idRaport, userId: "1" } })
                }
                }
              >
                {
                  mutation =>
                    <Button variant={'outlined'} onClick={() => mutation({
                      variables: {
                        name: title,
                        file: fileURL,
                        creationDate: currentDate('dateTime')
                      }
                    })}>
                      Zapisz
                    </Button>

                }
              </Mutation>
            )
            }
          </Mutation>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(DataToPDFStyle)(DataToPDF);
