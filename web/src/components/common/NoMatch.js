import React from 'react';
import Typography from '@material-ui/core/Typography';
import Redirect from 'react-router-dom/es/Redirect';

const NoMatch = props => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <Typography variant="h4" gutterBottom component="h2">
        Strona nie odnaleziona lub nie masz do niej dostępu.
      </Typography>
      <Redirect to={'/'} />
    </div>
  );
};

export default NoMatch;
