import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
};

let id = 0;

function createData(name, surname, login, pesel, nr_telefonu) {
  id += 1;
  return { id, name, surname, login, pesel, nr_telefonu };
}

const data = [
  createData('Rhonda', 'Finley', '100login', '13097101394', '759034213'),
  createData('Mara', 'Dejesus', '101login', '14504043735', '073988226'),
  createData('Branden', 'Reeves', '102login', '18879739829', '552211661'),
  createData('Genevieve', 'Newton', '103login', '60002125732', '116351890'),
  createData('Abra', 'Orr', '104login', '24756482579', '452568925')
];

function ExampleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>iduzytkownika</TableCell>
            <TableCell>Imie</TableCell>
            <TableCell>Nazwisko</TableCell>
            <TableCell>Login</TableCell>
            <TableCell>PESEL</TableCell>
            <TableCell>nr Telefonu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.id}
                </TableCell>
                <TableCell>{n.name}</TableCell>
                <TableCell>{n.surname}</TableCell>
                <TableCell>{n.login}</TableCell>
                <TableCell>{n.pesel}</TableCell>
                <TableCell>{n.nr_telefonu}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ExampleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExampleTable);
