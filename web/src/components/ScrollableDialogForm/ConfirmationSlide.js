import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography/Typography';
import Paper from "@material-ui/core/Paper/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide/Slide";

const styles = theme => ({
    root: {
        height: 'auto',
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing.unit,
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
});

class ConfirmationSlide extends React.Component {
  state = {
    open: this.props.open
  };

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) this.setState({ open: this.props.open });
  }

  render() {
    const { handleAgree, handleCancel, dialogMessage, classes } = this.props;
    const {open} = this.state;
    return (
      <div className={classes.container}>
              <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                  <Paper elevation={4} className={classes.paper}>
                      <Typography variant="h5" gutterBottom component="h1">
                          {dialogMessage}
                      </Typography>
                      <Button onClick={handleCancel} color="primary">
                          Nie
                      </Button>
                      <Button onClick={handleAgree} color="primary" autoFocus>
                          Tak
                      </Button>
                  </Paper>
              </Slide>
      </div>
    );
  }
}

ConfirmationSlide.propTypes = {
  dialogMessage: PropTypes.string.isRequired,
  handleAgree: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(ConfirmationSlide);
