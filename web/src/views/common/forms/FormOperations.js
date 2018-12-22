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
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { operationsValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import getDictProcesses from '../../../queries/DictionaryQueries/getDictProcesses';
import DialogForForm from './DialogForForm';
import StepperItemFromWarehouse from './StepperItemFromWarehouse';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import convertDatetimeForm from '../../../functions/convertDatetimeForm';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';
import getBatches from '../../../queries/BatchesQueries/getBatches';

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
      item: '',
      batches: '',
      open: false,
      openBatch: false,
      errors: errorMap
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenBatch = () => {
    this.setState({ openBatch: true });
  };

  handleCloseBatch = () => {
    this.setState({ openBatch: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSelect = (name, data) => event => {
    this.setState({
      [name]: data.find(record => record.nazwa === event.target.value)
    });
  };

  handleAddContent = data => {
    this.setState(prevState => ({
      item: [...prevState.item, data]
    }));
  };

  handleAddBatch = (batch, data) => {
    let object = {
      key: data.idPartie,
      selectedBatch: data,
      amount: data.ilosc
    };
    this.setState(prevState => ({
      batches: [...prevState.batches, object]
    }));
  };

  handleDelete = data => () => {
    this.setState(state => {
      const item = [...state.item];
      const contentToDelete = item.indexOf(data);
      item.splice(contentToDelete, 1);
      return { item };
    });
  };

  handleSubmit = () => {
    const {
      operationId,
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
      item,
      batches
    } = this.state;
    let dataObject = {
      operationId,
      beginAmount: Number(beginAmount),
      endAmount: Number(endAmount),
      beginDate,
      endDate,
      alcoholContent: Number(alcoholContent),
      additiveAmount: Number(additiveAmount),
      sugarContent: Number(sugarContent),
      acidity: Number(acidity),
      temperature: Number(temperature),
      desc,
      userId: '1',
      processId: process.idDictProcesy
    };

    // let jtId = { senderJTId, recipentJTId, carrierJTId, mailingAddressJTId, pickupAddressJTId };

    let arrayOfErrors = UniversalValidationHandler(dataObject, operationsValidationKeys);
    if (arrayOfErrors.length === 0) {
      this.props.setMutationDynamicVariables({ item, batches });
      this.props.onSubmit(this.props.mutation, dataObject);
    } else {
      let error = Object.assign({}, errorMap);
      for (let len = arrayOfErrors.length, i = 0; i < len; ++i) error[arrayOfErrors[i]] = true;
      this.setState({ errors: error });
      this.props.submitAborted();
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  componentDidMount() {
    const { initState } = this.props;
    if (initState) {
      let data = initState.Operacje[0];
      let itemJT = initState.OperacjeHasPozycjaWMagazynie;
      let batchJT = initState.OperacjeHasPartie;
      this.setState({
        operationId: data.idOperacja,
        beginAmount: data.iloscPrzed,
        endAmount: data.iloscPo ? data.iloscPo : '',
        beginDate: convertDatetimeForm(data.dataPoczatku),
        endDate: data.dataZakonczenia ? convertDatetimeForm(data.dataZakonczenia) : '',
        alcoholContent: data.zawartoscAlkoholu ? data.zawartoscAlkoholu : '',
        additiveAmount: data.iloscDodatku ? data.iloscDodatku : '',
        sugarContent: data.zawartoscCukru ? data.zawartoscCukru : '',
        acidity: data.kwasowosc ? data.kwasowosc : '',
        temperature: data.temperatura ? data.temperatura : '',
        desc: data.opis ? data.opis : '',
        process: data.dictProcesy ? data.dictProcesy : '',
        item: data.pozycjaWMagazynie
          ? data.pozycjaWMagazynie.map(curr => ({
              itemJTId: itemJT ? this.initItemJTId(itemJT, curr.idPozycja) : '',
              key: curr.idPozycja,
              selectedItem: curr,
              amount: curr.iloscFromJoinTable
            }))
          : '',
        batches: data.partie
          ? data.partie.map(curr => ({
              batchJTId: batchJT ? this.initBatchJTId(batchJT, curr.idPartie) : '',
              key: curr.idPartie,
              selectedBatch: curr,
              amount: curr.iloscFromJoinTable
            }))
          : ''
      });
    }
  }

  initItemJTId = (data, searchedId) => {
    return data.find(JT => JT.pozycjaWMagazynieIdPozycja === searchedId).idOperacjeHasPozycjaWMagazynie;
  };

  initBatchJTId = (data, searchedId) => {
    return data.find(JT => JT.partieIdPartie === searchedId).idOperacjeHasPartie;
  };

  filterBatches = data => {
    const { batches } = this.state;
    if (batches) return data.filter(item => batches.every(val => item.idPartie !== val.key));
    return data;
  };

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
      item,
      batches,
      open,
      openBatch,
      errors
    } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="inherit">Partie</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={8} justify={'center'}>
                  <Grid item md={12}>
                    {batches
                      ? batches.map(data => {
                          return (
                            <Chip
                              key={data.key}
                              label={data.selectedBatch.idPartie + ' ' + data.amount}
                              onDelete={this.handleDelete(data)}
                            />
                          );
                        })
                      : ''}
                  </Grid>
                  <Grid item md={12}>
                    <Button variant="outlined" onClick={this.handleClickOpenBatch}>
                      Dodaj
                    </Button>
                    <DialogForForm title={'Partie'} open={openBatch} onClose={() => this.handleCloseBatch('openBatch')}>
                      <Query query={getBatches}>
                        {({ loading, error, data }) => {
                          if (loading) return <CircularProgress />;
                          if (error)
                            return (
                              <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>
                            );
                          return (
                            <SelectableAutoTable
                              queryData={this.filterBatches(data.Partie)}
                              querySize={data.Partie.length}
                              funParam="batch"
                              onSelect={this.handleAddBatch}
                              onClose={this.handleCloseBatch}
                            />
                          );
                        }}
                      </Query>
                    </DialogForForm>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item md={12}>
            <Query query={getDictProcesses}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <TextField
                    fullWidth
                    error={errors.process}
                    required
                    id="process"
                    select
                    label="Rodzaj operacji"
                    placeholder="Rodzaj operacji"
                    value={process ? process.nazwa : ''}
                    onChange={this.handleSelect('process', data.DictProcesy)}
                    margin="dense"
                    variant={'outlined'}
                  >
                    {data.DictProcesy.map(record => (
                      <MenuItem key={record.idDictProcesy} value={record.nazwa}>
                        {record.nazwa}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            </Query>
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.beginAmount}
              required
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
              required
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
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="inherit">Produkty z magazynu</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={8} justify={'center'}>
                  <Grid item md={12}>
                    {item
                      ? item.map(data => {
                          return (
                            <Chip
                              key={data.key}
                              label={data.selectedItem.nazwa + ' ' + data.amount}
                              onDelete={this.handleDelete(data)}
                            />
                          );
                        })
                      : ''}
                  </Grid>
                  <Grid item md={12}>
                    <Button variant="outlined" onClick={this.handleClickOpen}>
                      Dodaj
                    </Button>
                    <DialogForForm
                      title={'Magazyn'}
                      open={open}
                      onClose={this.handleClose}
                      children={
                        <StepperItemFromWarehouse onSubmit={this.handleAddContent} onClose={this.handleClose} />
                      }
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
