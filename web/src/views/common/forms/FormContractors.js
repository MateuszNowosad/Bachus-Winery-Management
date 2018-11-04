import React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { FormAddress } from './FormAddress';

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
      fax: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { NIP, companyName, phoneNumber, eMail, wwwSite, KRS, accountNumber, fax } = this.state;

    this.props.onSubmit({
      NIP,
      companyName,
      phoneNumber,
      eMail,
      wwwSite,
      KRS,
      accountNumber,
      fax
    });
  };

  render() {
    const { NIP, companyName, phoneNumber, eMail, wwwSite, KRS, accountNumber, fax } = this.state;

    return (
      <Paper style={{ margin: '2% 20%' }}>
        <Typography variant={'h6'} align={'center'}>
          Nowy kontrahent
        </Typography>
        <form style={{ margin: '0% 25%' }}>
          <Grid container spacing={8} justify={'center'}>
            <Grid item md={6}>
              <TextField
                fullWidth
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
              <FormAddress />
            </Grid>
            <Grid item>
              <Button variant={'outlined'} style={{ margin: '10% 0 5% 0' }} onClick={this.handleSubmit}>
                Dodaj
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}
