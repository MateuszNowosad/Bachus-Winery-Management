import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core'
import {TableVineyards} from './TableVineyards'


export class DialogVineyard extends React.Component{
    render() {
        const {
            open,
            vineyards,
            onClose,
            onSelect
        } = this.props;

        return (
            <Dialog
                open={open}
                onClose={()=>onClose()}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Winnice</DialogTitle>
                <DialogContent>
                    <TableVineyards
                        vineyards={vineyards}
                        onSelect={onSelect}
                    />
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