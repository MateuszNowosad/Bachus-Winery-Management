import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import currentDate from './CurrentDate';
import { Query } from 'react-apollo';
import DialogForForm from './DialogForForm';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { itemInStockValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import getDictCategories from '../../../queries/DictionaryQueries/getDictCategories';
import getBatches from '../../../queries/BatchesQueries/getBatches';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import convertDatetimeForm from '../../../functions/convertDatetimeForm';
import getContractors from '../../../queries/ContractorsQueries/getContractors';
import getWarehouses from '../../../queries/WarehouseQueries/getWarehouses';

const errorMap = {
  name: false,
  desc: false,
  amount: false,
  barcode: false,
  actualState: false,
  acceptanceDate: false,
  releaseDate: false,
  sectorName: false,
  category: false
};

export class FormItemInStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      amount: '',
      barcode: '1234567890123',
      actualState: '1',
      acceptanceDate: currentDate('dateTime'),
      releaseDate: currentDate('dateTime'),
      sectorName: '',
      category: '',
      warehouseId: '',
      open: false,
      openWarehouse: false,
      errors: errorMap
    };
  }

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

  handleSelectWarehouse = (name, warehouse) => {
    this.setState({
      [name]: warehouse.idMagazyn
    });
  };

  handleSelectBatch = (name, batch) => {
    this.setState({
      [name]: batch
    });
  };

  handleClickOpen = name => {
    this.setState({ [name]: true });
  };

  handleClose = name => {
    this.setState({ [name]: false });
  };

  handleSubmit = () => {
    const {
      itemInStockId,
      name,
      desc,
      amount,
      barcode,
      actualState,
      acceptanceDate,
      releaseDate,
      sectorName,
      category,
      warehouseId,
      batchId
    } = this.state;
    let dataObject = {
      itemInStockId,
      name,
      desc,
      amount: Number(amount),
      barcode,
      actualState,
      acceptanceDate,
      releaseDate: releaseDate ? releaseDate : null,
      sectorName,
      categoryId: category.idKategorie,
      warehouseId: warehouseId ? warehouseId : null,
      batchId: batchId ? batchId : null
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, itemInStockValidationKeys);
    if (arrayOfErrors.length === 0) {
      this.props.onSubmit(this.props.mutation, dataObject);
    } else {
      let error = Object.assign({}, errorMap);
      for (let errorField in arrayOfErrors) {
        error[arrayOfErrors[errorField]] = true;
      }
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
      let data = initState.PozycjaWMagazynie[0];
      this.setState({
        itemInStockId: data.idPozycja,
        name: data.nazwa,
        desc: data.opis ? data.opis : '',
        amount: data.ilosc,
        //barcode: data.kodKreskowy,
        actualState: data.stanAktualny,
        acceptanceDate: convertDatetimeForm(data.dataPrzyjecia),
        releaseDate: data.dataWydania ? convertDatetimeForm(data.dataWydania) : '',
        sectorName: data.nazwaSektora,
        category: data.kategorie ? data.kategorie : '',
        warehouseId: data.magazyn ? data.magazyn.idMagazyn : '',
        batchId: data.partie ? data.partie.idPartie : ''
      });
    }
  }
  render() {
    const {
      warehouseId,
      name,
      desc,
      amount,
      acceptanceDate,
      releaseDate,
      sectorName,
      category,
      batch,
      open,
      openWarehouse,
      errors
    } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="warehouse"
              label="Magazyn"
              value={warehouseId ? warehouseId : 'Nie wybrano magazynu'}
              error={errors.warehouseId}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={() => this.handleClickOpen('openWarehouse')}
            />
            <DialogForForm title={'Magazyny'} open={openWarehouse} onClose={() => this.handleClose('openWarehouse')}>
              <Query query={getWarehouses}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return (
                    <SelectableAutoTable
                      queryData={data.Magazyn}
                      // querySubject="Kontrahenci"
                      querySize={data.Magazyn.length}
                      funParam="warehouseId"
                      onSelect={this.handleSelectWarehouse}
                      onClose={() => this.handleClose('openWarehouse')}
                      id={warehouseId ? warehouseId : null}
                    />
                  );
                }}
              </Query>
            </DialogForForm>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.name}
              required
              id="name"
              label="Nazwa"
              placeholder="Nazwa"
              value={name}
              onChange={this.handleChange('name')}
              margin="dense"
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.desc}
              id="desc"
              label="Opis"
              value={desc}
              margin="dense"
              onChange={this.handleChange('desc')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.amount}
              required
              id="amount"
              label="Ilość"
              value={amount}
              margin="dense"
              type="number"
              onChange={this.handleChange('amount')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.acceptanceDate}
              required
              id="acceptanceDate"
              label="Data przyjęcia"
              type="datetime-local"
              value={acceptanceDate}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('acceptanceDate')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.releaseDate}
              id="releaseDate"
              label="Data wydania"
              type="datetime-local"
              value={releaseDate}
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              onChange={this.handleChange('releaseDate')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.sectorName}
              required
              id="sectorName"
              label="Nazwa sektora"
              value={sectorName}
              margin="dense"
              onChange={this.handleChange('sectorName')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <Query query={getDictCategories}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <TextField
                    fullWidth
                    error={errors.category}
                    required
                    id="category"
                    label="Kategoria"
                    select
                    value={category ? category.nazwa : ''}
                    margin="dense"
                    onChange={this.handleSelect('category', data.DictKategorie)}
                    variant={'outlined'}
                  >
                    {data.DictKategorie.map(record => (
                      <MenuItem key={record.idKategorie} value={record.nazwa}>
                        {record.nazwa}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            </Query>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="batch"
              label="Partia"
              value={batch ? batch.idPartie : 'Nie wybrano partii'}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={() => this.handleClickOpen('open')}
            />
            <DialogForForm title={'Partie'} open={open} onClose={() => this.handleClose('open')}>
              <Query query={getBatches}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return (
                    <SelectableAutoTable
                      queryData={data.Partie}
                      querySize={data.Partie.length}
                      funParam="batch"
                      onSelect={this.handleSelectBatch}
                      onClose={() => this.handleClose('open')}
                      id={batch ? batch.idPartie : ''}
                    />
                  );
                }}
              </Query>
            </DialogForForm>
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormItemInStock.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
