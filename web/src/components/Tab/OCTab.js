import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SimpleTable from "../../variables/AdminDashboard/ExampleTable";

import OCTabStyle from "../../assets/jss/common/components/OCTabStyle.js";

function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

class OCTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes, theme, labels} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="secondary"
                        fullWidth
                    >
                        {labels.map((currElement, index) =>
                            <Tab key={index} label={currElement}/>
                        )}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        <div className={classes.tableContainer}>
                            <SimpleTable/>
                        </div>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <div className={classes.tableContainer}>
                            <SimpleTable/>
                        </div>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <div className={classes.tableContainer}>
                            <SimpleTable/>
                        </div>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

OCTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    labels: PropTypes.array.isRequired,
};

export default withStyles(OCTabStyle)(OCTabs);