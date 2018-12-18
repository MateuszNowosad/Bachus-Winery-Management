import gql from 'graphql-tag';

const getUsers = gql`
  {
    Uzytkownicy {
      idUzytkownika
      imie
      nazwisko
      login
      PESEL
      eMail
      nrTelefonu
      dataOstatniegoLogowania
      zdjecie
      rola {
        nazwa
      }
    }
  }
`;

export default getUsers;
