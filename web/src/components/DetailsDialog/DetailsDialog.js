import React from 'react';
import Dialog from '@material-ui/core/es/Dialog/Dialog';
import DialogContent from '@material-ui/core/es/DialogContent/DialogContent';
import ScrollableDialogFormStyle from '../../assets/jss/common/components/ScorllableDialogFormStyle';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/es/Button/Button';
import DetailsDialogContent from './DetailsDialogContent';
import DialogActions from '@material-ui/core/es/DialogActions/DialogActions';

class DetailsDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, open, queryData, dataType } = this.props;
    return (
      <Dialog
        aria-labelledby="modal-form-popup"
        aria-describedby="modal-form-popup"
        open={open}
        onClose={this.props.onClose}
        className={classes.dialog}
        scroll="body"
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogContent>
          <DetailsDialogContent queryData={queryData} dataType={dataType} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(ScrollableDialogFormStyle)(DetailsDialog);
