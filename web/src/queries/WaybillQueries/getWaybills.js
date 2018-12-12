import gql from 'graphql-tag';

const getWaybills = gql`
  {
    ListPrzewozowy {
      idListPrzewozowy
      imieKierowcy
      nazwiskoKierowcy
      uwagiPrzewoznika
      zastrzezeniaOdbiorcy
      kontrahent {
        idKontrahenci
      }
      adres {
        miejsce
      }
    }
  }
`;

export default getWaybills;
