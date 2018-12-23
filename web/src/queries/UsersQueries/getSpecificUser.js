import gql from 'graphql-tag';

const getSpecificUser = userID => gql`
  {
    Uzytkownicy(idUzytkownika: ${userID}) {
      idUzytkownika
      imie
      nazwisko
      login
      PESEL
      eMail
      nrTelefonu
      zdjecie
      dataOstatniegoLogowania
      rola {
        nazwa
      }
    }
  }
`;

export default getSpecificUser;
