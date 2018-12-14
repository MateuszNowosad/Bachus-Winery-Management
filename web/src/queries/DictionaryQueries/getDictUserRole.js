import gql from 'graphql-tag';

const getDictUserRole = gql`
  {
    DictRolaUzytkownikow {
      idRolaUzytkownikow
      nazwa
      opis
      typ
    }
  }
`;

export default getDictUserRole;
