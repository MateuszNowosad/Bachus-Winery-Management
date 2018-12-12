import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BackupStyle from "../../assets/jss/common/views/Database/BackupStyle.js";
import AdminDashboardStyle from '../../../assets/jss/common/views/AdminDashboard/AdminDashboardStyle.js';
import AutoTable from '../../../components/AutoTable/AutoTable';
import data from '../../../variables/AdminDashboard/AutoTableTestData';
import OCBigTab from '../../../components/Tab/OCBigTab.js';
import TabContainer from '../../../components/Tab/TabContainer';
import { FormUsers } from '../../common/forms/FormUsers';
import { Query } from 'react-apollo';
import getUsers from '../../../queries/UsersQueries/getUsers';
import getContractors from '../../../queries/ContractorsQueries/getContractors';
import getAddresses from '../../../queries/AdressesQueries/getAddresses';
import getDictUserRole from '../../../queries/DictionaryQueries/getDictUserRole';

const labels = ['Użytkownicy', 'Kontrachenci', 'Spis adresów', 'Słowniki'];

class DatabaseContactsAndUsers extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Baza danych: Systemy wspomagania zarządzania personaliami
        </Typography>
        <OCBigTab labels={labels}>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Użytkownicy
            </Typography>
            <Query query={getUsers}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let users = data.Uzytkownicy;
                return (
                  <AutoTable
                    queryData={users}
                    // querySubject="hero"
                    querySize={users.length}
                    dialogForm={<FormUsers />}
                    dialogFormTitle={'Użytkownik'}
                    editMode={true}
                  />
                );
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Kontrachenci
            </Typography>
            <Query query={getContractors}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let contractors = data.Kontrahenci;
                return <AutoTable queryData={contractors} querySize={contractors.length} editMode={false} />;
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Spis adresów
            </Typography>
            <Query query={getAddresses}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let addresses = data.Adres;
                return <AutoTable queryData={addresses} querySize={addresses.length} editMode={false} />;
              }}
            </Query>
          </TabContainer>
          <TabContainer>
            <Typography variant="h4" gutterBottom component="h1">
              Słowniki
            </Typography>
            <Typography variant="h5" gutterBottom component="h1">
              Role użytkowników
            </Typography>
            <Query query={getDictUserRole}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let userRoles = data.DictRolaUzytkownikow;
                return <AutoTable queryData={userRoles} querySize={userRoles.length} editMode={false} />;
              }}
            </Query>
          </TabContainer>
        </OCBigTab>
      </React.Fragment>
    );
  }
}

DatabaseContactsAndUsers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(AdminDashboardStyle)(DatabaseContactsAndUsers);
