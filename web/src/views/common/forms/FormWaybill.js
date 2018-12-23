import React from 'react';
import {
  Button,
  Grid,
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import { Query } from 'react-apollo';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import DialogForForm from './DialogForForm';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';
import { FormAddress } from './subforms/FormAddress';
import { FormParcel } from './subforms/FormParcel';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';
import { waybillValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import red from '@material-ui/core/colors/red';
import getContractors from '../../../queries/ContractorsQueries/getContractors';
import PDFWaybill from '../../../components/PDFSchemes/PDFWaybill';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import CreatePDF from '../../../components/PDFSchemes/CreatePDF';

const errorMap = {
  driverName: false,
  driverSurname: false,
  comments: false,
  reservations: false,
  fileURL: false,
  sender: false,
  recipent: false,
  carrier: false
};

export class FormWaybill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      driverName: '',
      driverSurname: '',
      comments: '',
      reservations: '',
      fileURL: '',
      sender: '',
      recipent: '',
      carrier: '',
      pickupAddress: '',
      mailingAddress: '',
      parcel: '',
      openSender: false,
      openRecipent: false,
      openCarrier: false,
      errors: errorMap
    };
    this.subFormMailing = React.createRef();
    this.subFormPickup = React.createRef();
    this.subFormParcel = React.createRef();
  }

  //TODO CZY ISTNIEJE SENDER
  static checkInDatabase() {
    return true;
  }

  subFormValidation() {
    this.subFormMailing.current.validate();
    this.subFormPickup.current.validate();
    this.subFormParcel.current.validate();
    return true;
  }

  generateWaybill = () => {
    const {
      driverName,
      driverSurname,
      comments,
      reservations,
      sender,
      recipent,
      carrier,
      pickupAddress,
      mailingAddress,
      parcel
    } = this.state;

    let dataObject = {
      driverName,
      driverSurname,
      comments,
      reservations,
      sender,
      recipent,
      carrier,
      pickupAddress,
      mailingAddress,
      parcel
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, waybillValidationKeys);
    !this.subFormValidation() && arrayOfErrors.push('subforms');
    if (arrayOfErrors.length === 0) {
      CreatePDF(PDFWaybill(dataObject)).then(results =>
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

  showFile = () => {
    let pdfWindow = window.open('');
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(this.state.fileURL) +
        "'></iframe>"
    );
  };

  handleSubmit = () => {
    const {
      waybillId,
      driverName,
      driverSurname,
      comments,
      reservations,
      fileURL,
      sender,
      senderJTId,
      recipent,
      recipentJTId,
      carrier,
      carrierJTId,
      pickupAddress: {
        addressId: addressIdMailing,
        street: streetMailing,
        buildingNumber: buildingNumberMailing,
        apartmentNumber: apartmentNumberMailing,
        postalCode: postalCodeMailing,
        city: cityMailing,
        country: countryMailing
      },
      pickupAddressJTId,
      mailingAddress: {
        addressId: addressIdPickup,
        street: streetPickup,
        buildingNumber: buildingNumberPickup,
        apartmentNumber: apartmentNumberPickup,
        postalCode: postalCodePickup,
        city: cityPickup,
        country: countryPickup
      },
      mailingAddressJTId,
      parcel: { parcelId, packageName, weight, date, content, initContent }
    } = this.state;

    let jtId = { senderJTId, recipentJTId, carrierJTId, mailingAddressJTId, pickupAddressJTId };

    let contentToDelete = initContent
      ? initContent.filter(
          initElement => !content.find(contentElement => contentElement.parcelJTId === initElement.parcelJTId)
        )
      : undefined;

    let dataObject = {
      waybillId,
      driverName,
      driverSurname,
      comments,
      reservations,
      fileURL,
      senderId: sender.idKontrahenci,
      recipentId: recipent.idKontrahenci,
      carrierId: carrier.idKontrahenci,
      addressIdMailing,
      streetMailing,
      buildingNumberMailing,
      apartmentNumberMailing,
      postalCodeMailing,
      cityMailing,
      countryMailing,
      addressIdPickup,
      streetPickup,
      buildingNumberPickup,
      apartmentNumberPickup,
      postalCodePickup,
      cityPickup,
      countryPickup,
      parcelId,
      packageName,
      weight: Number(weight),
      date
    };

    let arrayOfErrors = UniversalValidationHandler(dataObject, waybillValidationKeys);
    !this.subFormValidation() && arrayOfErrors.push('subforms');
    if (arrayOfErrors.length === 0) {
      this.props.setMutationDynamicVariables({ content, jtId, contentToDelete });
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

  handleClickOpen = name => {
    this.setState({ [name]: true });
  };

  handleClose = name => {
    this.setState({ [name]: false });
  };

  handleSelectContractor = (name, contractor) => {
    this.setState({
      [name]: contractor
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleObjectChange = (name, object) => {
    this.setState({
      [name]: object
    });
  };

  handleFileChange = event => {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.setState({
        fileURL: String(reader.result).replace('data:application/pdf;base64,', ''),
        errors: {
          ...this.state.errors,
          fileURL: false
        }
      });
    };
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  componentDidMount() {
    const { initState } = this.props;
    if (initState) {
      let data = initState.ListPrzewozowy[0];
      let contractorsJT = initState.ListPrzewozowyHasKontrahenci;
      let addressesJT = initState.ListPrzewozowyHasAdres;
      this.setState({
        waybillId: data.idListPrzewozowy,
        driverName: data.imieKierowcy,
        driverSurname: data.nazwiskoKierowcy,
        comments: data.uwagiPrzewoznika ? data.uwagiPrzewoznika : '',
        reservations: data.zastrzezeniaOdbiorcy ? data.zastrzezeniaOdbiorcy : '',
        fileURL: data.eDokument,
        sender: data.kontrahent ? this.initContractor(data.kontrahent, 'Nadawca') : '',
        senderJTId: contractorsJT ? this.initContractorJTId(contractorsJT, 'Nadawca') : '',
        recipent: data.kontrahent ? this.initContractor(data.kontrahent, 'Odbiorca') : '',
        recipentJTId: contractorsJT ? this.initContractorJTId(contractorsJT, 'Odbiorca') : '',
        carrier: data.kontrahent ? this.initContractor(data.kontrahent, 'Przewoznik') : '',
        carrierJTId: contractorsJT ? this.initContractorJTId(contractorsJT, 'Przewoznik') : '',
        mailingAddressJTId: addressesJT ? this.initAddressJTId(addressesJT, 'Nadania') : '',
        pickupAddressJTId: addressesJT ? this.initAddressJTId(addressesJT, 'Odbioru') : ''
      });
    }
  }

  initContractor = (data, type) => {
    return data.find(contractor => contractor.typ === type);
  };

  initContractorJTId = (data, type) => {
    return data.find(JT => JT.typ === type).idListPrzewozowyHasKontrahenci;
  };

  initAddressJTId = (data, place) => {
    return data.find(JT => JT.miejsce === place).idListPrzewozowyHasAdres;
  };

  initAddress = (data, type) => {
    return data.find(address => address.miejsce === type);
  };

  filterContractors = data => {
    const { sender, recipent, carrier } = this.state;

    return data.Kontrahenci.filter(
      contractor =>
        contractor.idKontrahenci !== (sender ? sender.idKontrahenci : '') &&
        contractor.idKontrahenci !== (recipent ? recipent.idKontrahenci : '') &&
        contractor.idKontrahenci !== (carrier ? carrier.idKontrahenci : '')
    );
  };

  render() {
    const {
      driverName,
      driverSurname,
      comments,
      reservations,
      sender,
      recipent,
      carrier,
      openSender,
      openRecipent,
      openCarrier,
      fileURL,
      errors
    } = this.state;

    const { initState } = this.props;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.driverName}
              required
              id="driverName"
              label="Imię kierowcy"
              value={driverName}
              margin="dense"
              onChange={this.handleChange('driverName')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.driverSurname}
              required
              id="driverSurname"
              label="Nazwisko kierowcy"
              value={driverSurname}
              margin="dense"
              onChange={this.handleChange('driverSurname')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.comments}
              id="comments"
              label="Uwagi przewoźnika"
              value={comments}
              margin="dense"
              onChange={this.handleChange('comments')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.reservations}
              id="reservations"
              label="Zastrzeżenia odbiorcy"
              value={reservations}
              margin="dense"
              onChange={this.handleChange('reservations')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="sender"
              label="Nadawca"
              value={sender ? sender.nazwaSpolki : 'Nie wybrano nadawcy'}
              error={errors.sender}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={() => this.handleClickOpen('openSender')}
            />
            <DialogForForm title={'Kontrahenci'} open={openSender} onClose={() => this.handleClose('openSender')}>
              <Query query={getContractors}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return (
                    <SelectableAutoTable
                      queryData={this.filterContractors(data)}
                      // querySubject="Kontrahenci"
                      querySize={data.Kontrahenci.length}
                      funParam="sender"
                      onSelect={this.handleSelectContractor}
                      onClose={() => this.handleClose('openSender')}
                      id={sender ? sender.idKontrahenci : null}
                    />
                  );
                }}
              </Query>
            </DialogForForm>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="recipent"
              label="Odbiorca"
              value={recipent ? recipent.nazwaSpolki : 'Nie wybrano odbiorcy'}
              error={errors.recipent}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={() => this.handleClickOpen('openRecipent')}
            />
            <DialogForForm title={'Kontrahenci'} open={openRecipent} onClose={() => this.handleClose('openRecipent')}>
              <Query query={getContractors}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return (
                    <SelectableAutoTable
                      queryData={this.filterContractors(data)}
                      // querySubject="Kontrahenci"
                      querySize={data.Kontrahenci.length}
                      funParam="recipent"
                      onSelect={this.handleSelectContractor}
                      onClose={() => this.handleClose('openRecipent')}
                      id={recipent ? recipent.idKontrahenci : null}
                    />
                  );
                }}
              </Query>
            </DialogForForm>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="carrier"
              label="Przewoźnik"
              value={carrier ? carrier.nazwaSpolki : 'Nie wybrano odbiorcy'}
              error={errors.carrier}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={() => this.handleClickOpen('openCarrier')}
            />
            <DialogForForm title={'Kontrahenci'} open={openCarrier} onClose={() => this.handleClose('openCarrier')}>
              <Query query={getContractors}>
                {({ loading, error, data }) => {
                  if (loading) return <CircularProgress />;
                  if (error)
                    return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                  return (
                    <SelectableAutoTable
                      queryData={this.filterContractors(data)}
                      // querySubject="Kontrahenci"
                      querySize={data.Kontrahenci.length}
                      funParam="carrier"
                      onSelect={this.handleSelectContractor}
                      onClose={() => this.handleClose('openCarrier')}
                      id={carrier ? carrier.idKontrahenci : null}
                    />
                  );
                }}
              </Query>
            </DialogForForm>
          </Grid>
          <Grid item md={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="inherit">Adres odbiorcy</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormAddress
                  varName="pickupAddress"
                  onChange={this.handleObjectChange}
                  ref={this.subFormPickup}
                  initState={initState ? this.initAddress(initState.ListPrzewozowy[0].adres, 'Odbioru') : null}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item md={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="inherit">Adres nadawcy</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormAddress
                  varName="mailingAddress"
                  onChange={this.handleObjectChange}
                  ref={this.subFormMailing}
                  initState={initState ? this.initAddress(initState.ListPrzewozowy[0].adres, 'Nadania') : null}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item md={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="inherit">Przesyłka</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormParcel
                  varName="parcel"
                  onChange={this.handleObjectChange}
                  ref={this.subFormParcel}
                  initState={initState ? initState : null}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item md={12}>
            <input hidden accept=".pdf" id="addFile" type="file" onChange={this.handleFileChange} />
            <label htmlFor="addFile">
              <Button
                variant="contained"
                component="span"
                style={
                  errors.fileURL
                    ? {
                        color: red[300],
                        backgroundColor: red[700],
                        '&:hover': {
                          backgroundColor: red[700]
                        }
                      }
                    : {}
                }
              >
                Dodaj dokument
              </Button>
            </label>
          </Grid>
          <Grid item md={12}>
            <Button variant={'contained'} onClick={fileURL === '' ? this.generateWaybill : this.showFile}>
              {fileURL === '' ? `Generuj list przewozowy` : `Podgląd`}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormWaybill.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
