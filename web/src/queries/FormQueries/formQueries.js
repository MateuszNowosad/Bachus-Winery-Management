import gql from 'graphql-tag';

export const getUserForForm = userID => gql`
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

export const getBatchForForm = batchID => gql`
  {
    Partie(idPartie: ${batchID}) {
      idPartie
      ilosc
      opis
      dataUtworzenia
      typPartii {
        idTypPartii
        nazwa
      }
     } 
  } 
`;

export const getContractorForForm = contractorID => gql`
  {
    Kontrahenci(idKontrahenci: ${contractorID}) {
      idKontrahenci
      NIP
      nazwaSpolki
      telefon
      eMail
      stronaWww
      KRS
      nrKonta
      fax
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

export const getDictUserRoleForForm = dictUserRoleID => gql`
  {
    DictRolaUzytkownikow(idRolaUzytkownikow: ${dictUserRoleID}) {
      idRolaUzytkownikow
      nazwa
      opis
      typ
    }
  }
`;

export const getDictBatchTypeForForm = dictBatchTypesID => gql`
  {
    DictTypPartii(idTypPartii: ${dictBatchTypesID}) {
      idTypPartii
      nazwa
      jednostka
    }
  }
`;

export const getDictCategoryForForm = dictCategoryID => gql`
  {
    DictKategorie(idKategorie: ${dictCategoryID}) {
  idKategorie
  nazwa
  jednostka
  opis
}
}
`;

export const getDictGrapeTypeForForm = dictGrapeTypeID => gql`
  {
  DictOdmianaWinogron (idOdmianaWinogron: ${dictGrapeTypeID}) {
  idOdmianaWinogron
  nazwa
  opis
}
}
`;
