import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DialogForFormStyle from "../../../assets/jss/common/components/DialogForFormStyle";

class DialogForForm extends React.Component {
  render() {
    const { open, onClose, title, classes } = this.props;

    return (
      <Dialog
          fullWidth={true}
          maxWidth={'lg'}
          open={open}
          onClose={() => onClose()}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            Wyjdź
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogForForm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func
};

export default withStyles(DialogForFormStyle)(DialogForForm);