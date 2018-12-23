import React from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { wineInformationValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import getDictWineCategory from '../../../queries/DictionaryQueries/getDictWineCategory';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import DialogForForm from './DialogForForm';
import getVineyards from '../../../queries/VineyardQueries/getVineyards';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';
import getBatches from '../../../queries/BatchesQueries/getBatches';

const errorMap = {
  name: false,
  motto: false,
  allergens: false,
  energyValue: false,
  wineCategory: false
};

export class FormWineInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      motto: '',
      allergens: '',
      energyValue: 0,
      wineCategory: {},
      batchId: '',
      open: false,
      errors: errorMap
    };
  }

  handleClickOpen = name => {
    this.setState({ [name]: true });
  };

  handleClose = name => {
    this.setState({ [name]: false });
  };

  handleSelectBatch = (name, batch) => {
    this.setState({
      [name]: batch.idPartie
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSelect = (name, data) => event => {
    this.setState({
      [name]: data.find(record => record.nazwaKategoria === event.target.value)
    });
  };

  handleSubmit = () => {
    const { wineInformationId, name, motto, allergens, energyValue, wineCategory, batchId } = this.state;
    let dataObject = {
      wineInformationId,
      name,
      motto,
      allergens,
      energyValue,
      wineCategoryId: wineCategory.idDictKategoriaWina,
      batchId
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, wineInformationValidationKeys);
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
      let data = initState.InformacjeOWinie[0];
      this.setState({
        wineInformationId: data.idInformacjeOWinie,
        name: data.nazwa,
        motto: data.motto ? data.motto : '',
        allergens: data.zawartoscPotAlergenow ? data.zawartoscPotAlergenow : '',
        energyValue: data.wartoscEnergetyczna,
        wineCategory: data.kategoriaWina ? data.kategoriaWina : null,
        batchId: data.partie ? data.partie[0].idPartie : ''
      });
    }
  }

  render() {
    const { name, motto, allergens, energyValue, wineCategory, batchId, open, errors } = this.state;
    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="batchId"
              label="Partia"
              value={batchId ? batchId : 'Nie wybrano partii'}
              error={errors.batchId}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={() => this.handleClickOpen('open')}
            />
            <DialogForForm title={'Winnice'} open={open} onClose={() => this.handleClose('open')}>
              <Query query={getBatches}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return (
                    <SelectableAutoTable
                      queryData={data.Partie}
                      // querySubject="Kontrahenci"
                      querySize={data.Partie.length}
                      funParam="batchId"
                      onSelect={this.handleSelectBatch}
                      onClose={() => this.handleClose('open')}
                      id={batchId ? batchId : null}
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
              label="Nazwa wina"
              value={name}
              margin="dense"
              onChange={this.handleChange('name')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.motto}
              id="motto"
              label="Motto"
              value={motto}
              margin="dense"
              onChange={this.handleChange('motto')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.allergens}
              id="allergens"
              label="Zawarte alergeny"
              value={allergens}
              margin="dense"
              onChange={this.handleChange('allergens')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.energyValue}
              required
              id="energyValue"
              label="Wartość energetyczna"
              type="number"
              value={energyValue}
              margin="dense"
              onChange={this.handleChange('energyValue')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <Query query={getDictWineCategory}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                return (
                  <TextField
                    fullWidth
                    id="wineCategory"
                    select
                    label="Kategoria wina"
                    placeholder="Kategoria wina"
                    value={wineCategory.nazwaKategoria ? wineCategory.nazwaKategoria : ''}
                    error={errors.wineCategory}
                    required
                    onChange={this.handleSelect('wineCategory', data.DictKategoriaWina)}
                    margin="dense"
                    variant={'outlined'}
                  >
                    {data.DictKategoriaWina.map(record => (
                      <MenuItem key={record.idDictKategoriaWina} value={record.nazwaKategoria}>
                        {record.nazwaKategoria}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            </Query>
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormWineInformation.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
