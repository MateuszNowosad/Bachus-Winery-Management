import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import MediaCard from "../../components/common/MediaCard";

class ProductionPlans extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="h4" gutterBottom component="h2">
                    Plany produkcji
                </Typography>
                <MediaCard/>
            </React.Fragment>
        );
    }
}

ProductionPlans.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(ProductionPlans);
