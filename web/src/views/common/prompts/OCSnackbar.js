import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class OCSnackbar extends React.Component {
    state = {
        open: false,
    };

    componentDidUpdate(prevProps){
        if (this.props.open !== prevProps.open)
            this.setState({open: this.props.open});
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    handleUndo = () => {
        this.setState({ open: false });
    };

    render(){
        const { classes, message } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleUndo}>
                            COFNIJ
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

OCSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
};

export default withStyles(styles)(OCSnackbar);