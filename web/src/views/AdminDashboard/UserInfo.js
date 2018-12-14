import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BackupStyle from "../../assets/jss/common/views/Users/BackupStyle.js";
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import userData from '../../variables/AdminDashboard/ExampleUser';
import example from '../../assets/img/example.jpg';
import Grid from '@material-ui/core/Grid/Grid';
import { Query } from 'react-apollo';
import getSpecificUser from '../../queries/UsersQueries/getSpecificUser';
import convertDatetime from '../../functions/convertDatetime';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

class Users extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Twój Profil
        </Typography>
        {/* Changed to 9 because 15th user.role = null */}
        <Query query={getSpecificUser(9)}>
          {({ loading, error, data }) => {
            error = true;
            if (loading) return <CircularProgress />;
            if (error)
              return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
            let user = data.Uzytkownicy[0];
            console.log('26,  jakub: ', user);
            return (
              <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                <Grid item xs>
                  <Typography variant="h5" gutterBottom component="h1">
                    Imię
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {/*{userData['userData']['user'][0].imie}*/}
                    {user.imie}
                  </Typography>
                  <Typography variant="h5" gutterBottom component="h1">
                    Nazwisko
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {/*{userData['userData']['user'][0].nazwisko}*/}
                    {user.nazwisko}
                  </Typography>
                  <Typography variant="h5" gutterBottom component="h1">
                    Email
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {/*{userData['userData']['user'][0].eMail}*/}
                    {user.eMail}
                  </Typography>
                  <Typography variant="h5" gutterBottom component="h1">
                    Numer telefonu
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {/*{userData['userData']['user'][0].nrTelefonu}*/}
                    {user.nrTelefonu}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h5" gutterBottom component="h1">
                    Login
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {/*{userData['userData']['user'][0].login}*/}
                    {user.login}
                  </Typography>
                  <Typography variant="h5" gutterBottom component="h1">
                    Rola użytkownika
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {/*{userData['userData']['user'][0].rola}*/}
                    {user.rola.nazwa}
                  </Typography>
                  {/*<Typography variant="h5" gutterBottom component="h1">*/}
                  {/*Data utworzenia konta*/}
                  {/*</Typography>*/}
                  {/*<Typography variant="subtitle1" gutterBottom component="div">*/}
                  {/*/!*{userData['userData']['user'][0].createdAt*!/*/}
                  {/*</Typography>*/}
                  <Typography variant="h5" gutterBottom component="h1">
                    Data ostatniego logowania
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {/*{userData['userData']['user'][0].dataOstatniegoLogowania}*/}
                    {convertDatetime(user.dataOstatniegoLogowania)}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h5" gutterBottom component="h1">
                    Zdjecie
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    <img src={example} height={200} width={200} />
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(Users);
