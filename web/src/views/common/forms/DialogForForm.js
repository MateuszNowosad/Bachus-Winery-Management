import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core'


export class DialogForForm extends React.Component{
    render() {
        const {
            open,
            onClose,
            title,
        } = this.props;

        return (
            <Dialog
                open={open}
                onClose={()=>onClose()}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {this.props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>onClose()} color="primary">
                        Wyjdź
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}