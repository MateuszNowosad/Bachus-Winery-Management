import React from 'react';
import { TextField, Chip, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import currentDate from './CurrentDate';
import { DialogForForm } from './DialogForForm';
import StepperParcelContent from './StepperParcelContent';

export class FormParcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName: '',
      weight: '',
      date: currentDate('date'),
      content: [],
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    const { packageName, weight, date, content } = this.state;
    const { varName } = this.props;
    this.props.onChange(varName, {
      packageName,
      weight,
      date,
      content
    });
  };

  handleAddContent = data => {
    this.setState(prevState => ({
      content: [...prevState.content, data]
    }));
  };

  handleDelete = data => () => {
    this.setState(state => {
      const content = [...state.content];
      const contentToDelete = content.indexOf(data);
      content.splice(contentToDelete, 1);
      return { content };
    });
  };

  render() {
    const { packageName, weight, date, open } = this.state;
    return (
      <Grid container spacing={8}>
        <Grid item md={6}>
          <TextField
            fullWidth
            id="packageName"
            label="Nazwa przesyłki"
            placeholder="Nazwa przesyłki"
            value={packageName}
            margin="dense"
            onChange={this.handleChange('packageName')}
            variant={'outlined'}
            inputProps={{
              maxLength: '20'
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            id="weight"
            label="Waga"
            placeholder="Waga"
            value={weight}
            margin="dense"
            type={'number'}
            onChange={this.handleChange('weight')}
            variant={'outlined'}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            id="date"
            label="Data odbioru/dostarczenia"
            type="date"
            value={date}
            InputLabelProps={{
              shrink: true
            }}
            margin="dense"
            onChange={this.handleChange('date')}
            variant={'outlined'}
          />
        </Grid>
        <Grid item md={12}>
          {this.state.content.map(data => {
            return <Chip key={data.key} label={data.name} onDelete={this.handleDelete(data)} />;
          })}
        </Grid>
        <Grid item md={12}>
          <Button variant="outlined" onClick={this.handleClickOpen}>
            Dodaj
          </Button>
          <DialogForForm
            title={'Magazyn'}
            open={open}
            onClose={this.handleClose}
            children={<StepperParcelContent onSubmit={this.handleAddContent} onClose={this.handleClose} />}
          />
        </Grid>
      </Grid>
    );
  }
}
