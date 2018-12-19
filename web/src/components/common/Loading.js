import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';

const Loading = props => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <Typography variant="h4" gutterBottom component="h2">
        Ładowanie...
      </Typography>
    </div>
  );
};

export default Loading;
