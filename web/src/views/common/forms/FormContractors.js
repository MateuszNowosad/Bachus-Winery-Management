import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { FormAddress } from './subforms/FormAddress';
import PropTypes from 'prop-types';
import { contractorsValidationKeys } from './UniversalValidationHandler/validationKeys/validationKeys';
import UniversalValidationHandler from './UniversalValidationHandler/UniversalValidationHandler';

const errorMap = {
  NIP: false,
  companyName: false,
  phoneNumber: false,
  eMail: false,
  wwwSite: false,
  KRS: false,
  accountNumber: false,
  fax: false
};

export class FormContractors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NIP: '',
      companyName: '',
      phoneNumber: '',
      eMail: '',
      wwwSite: '',
      KRS: '',
      accountNumber: '',
      fax: '',
      address: {},
      errors: errorMap
    };
    this.subForm = React.createRef();
  }

  subFormValidation() {
    return this.subForm.current.validate();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleAddressChange = (name, address) => {
    this.setState({
      [name]: address
    });
  };

  validateKRSNIP() {
    if (this.state.NIP === '' && this.state.KRS === '') {
      alert('Musisz wypełnić NIP lub KRS');
      return false;
    }
    return true;
  }

  handleSubmit = () => {
    const { NIP, companyName, phoneNumber, eMail, wwwSite, KRS, accountNumber, fax, address } = this.state;

    let dataObject = {
      NIP,
      companyName,
      phoneNumber,
      eMail,
      wwwSite,
      KRS,
      accountNumber,
      fax,
      address
    };
    let arrayOfErrors = UniversalValidationHandler(dataObject, contractorsValidationKeys);
    !this.subFormValidation() && arrayOfErrors.push('address');
    this.validateKRSNIP() && arrayOfErrors.push(['NIP', 'KRS']);
    if (arrayOfErrors.length === 0) {
      if (this.props.onSubmit(dataObject)) this.props.formSubmitted();
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

  render() {
    const { NIP, companyName, phoneNumber, eMail, wwwSite, KRS, accountNumber, fax, errors } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.NIP}
              id="NIP"
              label="NIP"
              placeholder="NIP"
              value={NIP}
              margin="dense"
              onChange={this.handleChange('NIP')}
              variant={'outlined'}
              inputProps={{
                maxLength: '10'
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.companyName}
              required
              id="companyName"
              label="Nazwa spółki"
              placeholder="Nazwa spółki"
              value={companyName}
              margin="dense"
              onChange={this.handleChange('companyName')}
              variant={'outlined'}
              inputProps={{
                maxLength: '40'
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              error={errors.eMail}
              required
              id="eMail"
              label="Adres e-mail"
              placeholder="Adres e-mail"
              value={eMail}
              margin="dense"
              onChange={this.handleChange('eMail')}
              variant={'outlined'}
              inputProps={{
                maxLength: '90'
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.wwwSite}
              id="wwwSite"
              label="Strona www"
              placeholder="Strona www"
              value={wwwSite}
              margin="dense"
              onChange={this.handleChange('wwwSite')}
              variant={'outlined'}
              inputProps={{
                maxLength: '255'
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.fax}
              id="fax"
              label="Fax"
              placeholder="Fax"
              value={fax}
              margin="dense"
              onChange={this.handleChange('fax')}
              variant={'outlined'}
              inputProps={{
                maxLength: '45'
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.phoneNumber}
              required
              id="phoneNumber"
              label="Numer telefonu"
              placeholder="Numer telefonu"
              value={phoneNumber}
              margin="dense"
              inputProps={{
                maxLength: '11'
              }}
              onChange={this.handleChange('phoneNumber')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.KRS}
              id="KRS"
              label="KRS"
              placeholder="KRS"
              value={KRS}
              margin="dense"
              inputProps={{
                maxLength: '10'
              }}
              onChange={this.handleChange('KRS')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              error={errors.accountNumber}
              required
              id="accountNumber"
              label="Numer konta"
              placeholder="Numer konta"
              value={accountNumber}
              margin="dense"
              inputProps={{
                maxLength: '26'
              }}
              onChange={this.handleChange('accountNumber')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <FormAddress varName="address" onChange={this.handleAddressChange} ref={this.subForm} />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormContractors.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func,
  submitAborted: PropTypes.func
};
