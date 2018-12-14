import gql from 'graphql-tag';

const getUserForForm = userID => gql`
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
        rola {
          idRolaUzytkownikow
          nazwa
        }
        adres {
          idAdres
          miasto
          kodPocztowy
          ulica
          nrLokalu
          nrPosesji
          kraj
        }
    }
  }
`;

export default getUserForForm;
