import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
    state = {
        open: this.props.open,
    };

    render() {
        const {dialogTitle, handleAgree, handleCancel, dialogMessage} = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {dialogMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={handleAgree} color="primary" autoFocus>
                            Wykonaj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AlertDialog.propTypes = {
    dialogTitle: PropTypes.string.isRequired,
    dialogMessage: PropTypes.string.isRequired,
    handleAgree: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default AlertDialog;