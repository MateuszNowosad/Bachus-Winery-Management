import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class NoMatch extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <Typography variant="h4" gutterBottom component="h2">
          Strona nie odnaleziona lub nie masz do niej dostępu.
        </Typography>
      </div>
    );
  }
}

NoMatch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default NoMatch;
