import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';

export class DialogForForm extends React.Component {
  render() {
    const { open, onClose, title } = this.props;

    return (
      <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
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
