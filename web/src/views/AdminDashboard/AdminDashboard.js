import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminDashboardStyle from '../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../components/AutoTable/AutoTable';
import { Query } from 'react-apollo';
import getOperations from '../../queries/OperationQueries/getOperations';
import { FormOperations } from '../common/forms/FormOperations';
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress';
import Logo from '../../assets/img/logo_bachus.png';

const labels = ['Ostatnie wydarzenia', 'Plany produkcyjne', 'Ostatnie operacje na partiach', 'Ostatnie na winnicach'];

class AdminDashboard extends React.Component {
  sortOperations = data => {
    return data.sort((a, b) => Number(b.dataZakonczenia) - Number(a.dataZakonczenia));
  };
  sortVineyardOperations = data => {
    return data.sort((a, b) => Number(b.data) - Number(a.data));
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography component="h2" variant="h1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} gutterBottom>
         Witamy w Systemie Bachus!
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src={Logo} alt="Logo"/>
        </div>
        <Typography component="h2" variant="h4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} gutterBottom>
         Ostatnio wykonane operacje
        </Typography>
            <Query query={getOperations}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;
                if (error)
                  return <p>Wystąpił błąd podczas ładowania informacji z bazy danych. Spróbuj ponownie później.</p>;
                let operations = [].concat(data.Operacje);
                operations = this.sortOperations(operations).slice(0, 50);
                return (
                  <AutoTable
                    queryData={operations}
                    // querySubject="hero"
                    querySize={operations.length}
                    dialogForm={<FormOperations />}
                    dialogFormTitle={'Operacja na partii'}
                    editMode={true}
                  />
                );
              }}
            </Query>
      </React.Fragment>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(AdminDashboard);
