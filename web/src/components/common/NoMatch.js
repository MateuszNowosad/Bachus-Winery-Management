import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const NoMatch = props => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' ,flexDirection: 'column'}}>
        <Typography variant="h4" gutterBottom component="h2">
          Strona nie odnaleziona lub nie masz do niej dostępu.
        </Typography>
        <Link to={'/'}>Przejdź na stronę logowania</Link>
    </div>
  );
};

export default NoMatch;
