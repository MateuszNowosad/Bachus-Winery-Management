import React from 'react';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import DialogContent from '@material-ui/core/es/DialogContent/DialogContent';
import ScrollableDialogFormStyle from '../../assets/jss/common/components/ScorllableDialogFormStyle';
import Typography from '@material-ui/core/es/Typography/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/es/Button/Button';
import flattenObject from '../../functions/flattenObject';
import Grid from '@material-ui/core/Grid';
import DetailsDialogContent from './DetailsDialogContent';
import DialogActions from '@material-ui/core/es/DialogActions/DialogActions';

class DetailsDialog extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    const { classes, dialogTitle,open,queryData, dataType } = this.props;
  return (
      <Dialog
        aria-labelledby="modal-form-popup"
        aria-describedby="modal-form-popup"
        open={open}
        onClose={this.props.onClose}
        className={classes.dialog}
        scroll="body"
        fullWidth={true}
        maxWidth={'lg'}>
        <DialogContent>
          {/*<DialogTitle>{dialogTitle}</DialogTitle>*/}
          <DetailsDialogContent
            queryData={queryData}
            dataType={dataType}
          />
        </DialogContent>
        <DialogActions>
          <Button
          onClick = {this.props.onClose}
          >
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


export default withStyles(ScrollableDialogFormStyle)(DetailsDialog);