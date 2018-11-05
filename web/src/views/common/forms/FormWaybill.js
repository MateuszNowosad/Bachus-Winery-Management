import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DialogForForm } from './DialogForForm';
import { data } from './StaticData';
import SelectableAutoTable from '../../../components/SelectableAutoTable/SelectableAutoTable';

export class FormWaybill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      driverName: '',
      driverSurname: '',
      comments: '',
      reservations: '',
      file: '',
      sender: {},
      recipent: {},
      carrier: {},
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { driverName, driverSurname, comments, reservations, file, sender, recipent, carrier } = this.state;
    this.props.onSubmit({
      driverName,
      driverSurname,
      comments,
      reservations,
      file,
      sender,
      recipent,
      carrier
    });
    this.props.formSubmitted();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleContractorSelect = sender => {
    this.setState({
      sender: sender
    });
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.submitFromOutside && this.props.submitFromOutside) {
      this.handleSubmit();
    }
  }

  render() {
    const { driverName, driverSurname, comments, reservations, sender, open } = this.state;

    return (
      <form style={{ margin: '0% 25%' }}>
        <Grid container spacing={8} justify={'center'}>
          <Grid item md={12}>
            <TextField
              fullWidth
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
              id="reservations"
              label="Zastrzeżenia odbiorcy"
              value={reservations}
              margin="dense"
              onChange={this.handleChange('reservations')}
              variant={'outlined'}
            />
          </Grid>
          <Grid item md={12}>
            <input
              hidden
              accept="application/pdf"
              id="addFile"
              type="file"
              //onChange={this.handleFileChange}
            />
            <label htmlFor="addImage">
              <Button variant="raised" component="span">
                Dodaj dokument
              </Button>
            </label>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="sender"
              label="Nadawca"
              value={sender.name ? sender.name : 'Nie wybrano nadawcy'}
              margin="dense"
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              onClick={this.handleClickOpen}
            />
            <DialogForForm
              title={'Kontrahenci'}
              open={open}
              onClose={this.handleClose}
              children={
                <SelectableAutoTable
                  queryData={data}
                  querySubject="contractors"
                  onSelect={this.handleContractorSelect}
                  onClose={this.handleClose}
                  id={sender.id}
                />
              }
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

FormWaybill.propTypes = {
  submitFromOutside: PropTypes.bool,
  onSubmit: PropTypes.func,
  formSubmitted: PropTypes.func
};
