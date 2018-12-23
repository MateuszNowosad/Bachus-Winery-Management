import gql from 'graphql-tag';

export const getUserForForm = gql`
  query getUserForForm($id: ID) {
    Uzytkownicy(idUzytkownika: $id) {
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

export const getBatchForForm = gql`
  query getBatchForForm($id: ID) {
    Partie(idPartie: $id) {
      idPartie
      ilosc
      opis
      dataUtworzenia
      czyPrzepis
      typPartii {
        idTypPartii
        nazwa
      }
      winobranie {
        idWinobranie
      }
      partie {
        idPartie
      }
    }
  }
`;

export const getContractorForForm = gql`
  query getContractorForForm($id: ID) {
    Kontrahenci(idKontrahenci: $id) {
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

export const getDictUserRoleForForm = gql`
  query getDictUserRoleForForm($id: ID) {
    DictRolaUzytkownikow(idRolaUzytkownikow: $id) {
      idRolaUzytkownikow
      nazwa
      opis
      typ
    }
  }
`;

export const getDictBatchTypeForForm = gql`
  query getDictBatchTypeForForm($id: ID) {
    DictTypPartii(idTypPartii: $id) {
      idTypPartii
      nazwa
      jednostka
    }
  }
`;

export const getDictCategoryForForm = gql`
  query getDictCategoryForForm($id: ID) {
    DictKategorie(idKategorie: $id) {
      idKategorie
      nazwa
      jednostka
      opis
    }
  }
`;

export const getDictGrapeTypeForForm = gql`
  query getDictGrapeTypeForForm($id: ID) {
    DictOdmianaWinogron(idOdmianaWinogron: $id) {
      idOdmianaWinogron
      nazwa
      opis
    }
  }
`;

export const getDictProcesForForm = gql`
  query getDictProcesForForm($id: ID) {
    DictProcesy(idDictProcesy: $id) {
      idDictProcesy
      nazwa
      opis
      dodatkowe
    }
  }
`;

export const getDictVineyardOperationForForm = gql`
  query getDictVineyardOperationForForm($id: ID) {
    DictOperacjeNaWinnicy(idDictOperacjeNaWinnicy: $id) {
      idDictOperacjeNaWinnicy
      nazwa
      opis
    }
  }
`;

export const getDictWineCategoryForForm = gql`
  query getDictWineCategoryForForm($id: ID) {
    DictKategoriaWina(idDictKategoriaWina: $id) {
      idDictKategoriaWina
      nazwaKategoria
      opis
    }
  }
`;

export const getGrapeHarvestForForm = gql`
  query getGrapeHarvestForForm($id: ID) {
    Winobranie(idWinobranie: $id) {
      idWinobranie
      dataWinobrania
      iloscZebranychWinogron
      winnica {
        idWinnica
        nazwa
      }
    }
  }
`;

export const getItemInStockForForm = gql`
  query getItemInStockForForm($id: ID) {
    PozycjaWMagazynie(idPozycja: $id) {
      idPozycja
      nazwa
      opis
      ilosc
      kodKreskowy
      stanAktualny
      dataPrzyjecia
      dataWydania
      nazwaSektora
      kategorie {
        idKategorie
        nazwa
      }
      partie {
        idPartie
        ilosc
        opis
        dataUtworzenia
      }
      magazyn {
      idMagazyn
    }
    }
  }
`;

export const getOperationForForm = gql`
  query getOperationForForm($id: ID, $idFK: String!) {
    Operacje(idOperacja: $id) {
      idOperacja
      iloscPrzed
      iloscPo
      dataPoczatku
      dataZakonczenia
      zawartoscAlkoholu
      iloscDodatku
      zawartoscCukru
      kwasowosc
      temperatura
      opis
      dictProcesy {
        idDictProcesy
        nazwa
      }
      pozycjaWMagazynie {
        idPozycja
        nazwa
        ilosc
        iloscFromJoinTable
      }
      partie {
        idPartie
        iloscFromJoinTable
      }
      uzytkownicy {
      idUzytkownika
    }
    }
    OperacjeHasPozycjaWMagazynie(operacjeIdOperacja: $idFK) {
      idOperacjeHasPozycjaWMagazynie
      pozycjaWMagazynieIdPozycja
      ilosc
    }
    OperacjeHasPartie(operacjeIdOperacja: $idFK) {
      idOperacjeHasPartie
      partieIdPartie
      ilosc
    }
  }
`;

export const getVineyardForForm = gql`
  query getVineyardForForm($id: ID) {
    Winnica(idWinnica: $id) {
      idWinnica
      nazwa
      powierzchnia
      terroir
      dataZasadzenia
      ewidencyjnyIdDzialki
      dictOdmianaWinogron {
        idOdmianaWinogron
        nazwa
      }
      stan
    }
  }
`;

export const getVineyardOperationForForm = gql`
  query getVineyardOperationForForm($id: ID) {
    OperacjeNaWinnicy(idOperacja: $id) {
      idOperacja
      data
      opis
      dictOperacjeNaWinnicy {
        idDictOperacjeNaWinnicy
        nazwa
      }
      winnica {
        idWinnica
        nazwa
      }
    }
  }
`;

export const getWarehouseForForm = gql`
  query getWarehouseForForm($id: ID) {
    Magazyn(idMagazyn: $id) {
      idMagazyn
      rodzaj
      pojemnosc
      adres: adresIdAdres {
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

export const getWaybillForForm = gql`
  query getWaybillForForm($id: ID!, $idFK: String!) {
    ListPrzewozowy(idListPrzewozowy: $id) {
      idListPrzewozowy
      imieKierowcy
      nazwiskoKierowcy
      uwagiPrzewoznika
      zastrzezeniaOdbiorcy
      eDokument
      kontrahent {
        idKontrahenci
        NIP
        nazwaSpolki
        telefon
        eMail
        stronaWww
        KRS
        nrKonta
        fax
        typ
      }
      przesylka {
        idPrzesylka
        nazwaPrzesylki
        ciezarLadunku
        data
        pozycjaWMagazynie {
          idPozycja
          iloscFromJoinTable
          nazwa
          ilosc
        }
      }
      adres {
        idAdres
        miasto
        kodPocztowy
        ulica
        nrLokalu
        nrPosesji
        kraj
        miejsce
      }
    }
    ListPrzewozowyHasKontrahenci(listPrzewozowyIdListPrzewozowy: $idFK) {
      idListPrzewozowyHasKontrahenci
      kontrahenciIdKontrahenci
      typ
    }
    ListPrzewozowyHasAdres(listPrzewozowyIdListPrzewozowy: $idFK) {
      idListPrzewozowyHasAdres
      adresIdAdres
      miejsce
    }
    PrzesylkaHasPozycjaWMagazynie {
      idPrzesylkaHasPozycjaWMagazynie
      pozycjaWMagazynieIdPozycja
      przesylkaIdPrzesylka
      ilosc
    }
  }
`;

export const getWineInformationForForm = gql`
  query getWineInformationForForm($id: ID) {
    InformacjeOWinie(idInformacjeOWinie: $id) {
      idInformacjeOWinie
      nazwa
      motto
      zawartoscPotAlergenow
      wartoscEnergetyczna
      kategoriaWina {
        idDictKategoriaWina
        nazwaKategoria
      }
      partie {
    idPartie
  }
    }
  }
`;
