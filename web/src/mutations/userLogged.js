import gql from 'graphql-tag'
import currentDate from '../views/common/forms/CurrentDate';

export const userLogged = gql`
mutation userLogged($userId: ID!){
  upsertUzytkownicy(
  idUzytkownika: $userId
  dataOstatniegoLogowania: "${currentDate('dateTime')}"
  ){
  idUzytkownika
  }
}
  `;