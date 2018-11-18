import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import ScrollableDialogFormStyle from '../../assets/jss/common/components/ScorllableDialogFormStyle.js';
import Button from '@material-ui/core/Button/Button';
import UniversalSubmitHander from '../../views/common/forms/UniversalSubmitHandler';
import OCSnackbar from '../../views/common/prompts/OCSnackbar';
import ConfirmationSlide from './ConfirmationSlide';

class ScrollableDialogForm extends React.Component {
  state = {
    submit: false,
    openSnackbar: false,
    openConfirmationPrompt: false
  };

  handleStage = () => {
    this.setState({ openConfirmationPrompt: true });
  };
  handleUnstage = () => {
    this.setState({ openConfirmationPrompt: false });
  };

  handleSubmit = () => {
    this.setState({ submit: true, openConfirmationPrompt: false });
  };

  formSubmitted = () => {
    this.setState({ submit: false, openSnackbar: true });
    this.handleClose();
  };

  handleClose = () => {
    this.props.closeForm();
  };

  render() {
    const { classes, children, dialogTitle, open } = this.props;
    const { openConfirmationPrompt, openSnackbar, submit } = this.state;
    return (
      <div>
        <Dialog
          aria-labelledby="modal-form-popup"
          aria-describedby="modal-form-popup"
          open={open}
          onClose={this.props.closeForm}
          className={classes.dialog}
          scroll="body"
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogContent>
            <DialogTitle>{dialogTitle}</DialogTitle>
            {React.cloneElement(children, {
              submitFromOutside: submit,
              onSubmit: UniversalSubmitHander,
              formSubmitted: this.formSubmitted
            })}
          </DialogContent>
          <DialogActions classes={{ root: classes.root }}>
            {openConfirmationPrompt ? (
              <ConfirmationSlide
                dialogMessage={'Czy na pewno chcesz dodać ten wpis do bazy danych?'}
                handleAgree={this.handleSubmit}
                handleCancel={this.handleUnstage}
                open={openConfirmationPrompt}
              />
            ) : (
              <React.Fragment>
                <Button variant="contained" onClick={this.props.closeForm} color="secondary">
                  Anuluj
                </Button>
                <Button variant="contained" onClick={this.handleStage} color="primary">
                  Zapisz
                </Button>
              </React.Fragment>
            )}
          </DialogActions>
        </Dialog>
        <OCSnackbar message={'Zapisano zmiany do bazy danych'} open={openSnackbar} />
      </div>
    );
  }
}

ScrollableDialogForm.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  openForm: PropTypes.func.isRequired
};

export default withStyles(ScrollableDialogFormStyle)(ScrollableDialogForm);
