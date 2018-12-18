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
import Loading from '../../components/common/Loading';
import NoMatch from '../../components/common/NoMatch';
import axios from 'axios';

class Users extends React.Component {
  state = {
    id: null,
    error: false
  };
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:8080/usrrole',
      withCredentials: true
    }).then(response => {
      console.log('41, response Mateusz: ', response);
      if (response.data) {
        console.log('43, "Success" Mateusz: ', 'Success');
        this.setState({ id: response.data.idUzytkownika, error: false });
      } else {
        console.log('45, "Error" Mateusz: ', 'Error');
        this.setState({ error: true });
      }
    });
  }

  render() {
    const { id, error } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          Twój Profil
        </Typography>
        {/* Changed to 9 because 15th user.role = null */}
        {error && <NoMatch />}
        {id !== null ? (
          <Query query={getSpecificUser(this.state.id)}>
            {({ loading, error, data }) => {
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
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(Users);
