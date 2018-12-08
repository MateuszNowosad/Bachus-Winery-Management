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

const labels = ['Użytkownicy', 'Kontrachenci', 'Spis adresów', 'Słowniki'];

class DatabaseContactsAndUsers extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Baza danych: Systemy wspomagania produkcji
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
                console.log('33,  jakub: query odpalone: ', data);
                let users = data.Uzytkownicy;
                return (
                  <AutoTable
                    queryData={users}
                    // querySubject="hero"
                    querySize={249}
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
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h5" gutterBottom component="h1">
              Spis adresów
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
          </TabContainer>
          <TabContainer>
            <Typography variant="h4" gutterBottom component="h1">
              Słowniki
            </Typography>
            <Typography variant="h5" gutterBottom component="h1">
              Role użytkowników
            </Typography>
            <AutoTable queryData={data} querySubject="hero" querySize={2} editMode={false} />
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
