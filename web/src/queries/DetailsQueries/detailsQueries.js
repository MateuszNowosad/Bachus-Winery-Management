import gql from 'graphql-tag';

export const getUserDetails = gql`
  query getUserDetails($id: ID) {
    Uzytkownicy(idUzytkownika: $id) {
      idUzytkownika
      imie
      nazwisko
      login
      PESEL
      eMail
      nrTelefonu
      zdjecie
    dataOstatniegoLogowania
    czyAktywne
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

export const getBatchDetails = gql`
  query getBatchDetails($id: ID) {
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

export const getContractorDetails = gql`
  query getContractorDetails($id: ID) {
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

export const getDictUserRoleDetails = gql`
  query getDictUserRoleDetails($id: ID) {
    DictRolaUzytkownikow(idRolaUzytkownikow: $id) {
      idRolaUzytkownikow
      nazwa
      opis
      typ
    }
  }
`;

export const getDictBatchTypeDetails = gql`
  query getDictBatchTypeDetails($id: ID) {
    DictTypPartii(idTypPartii: $id) {
      idTypPartii
      nazwa
      jednostka
    }
  }
`;

export const getDictCategoryDetails = gql`
  query getDictCategoryDetails($id: ID) {
    DictKategorie(idKategorie: $id) {
      idKategorie
      nazwa
      jednostka
      opis
    }
  }
`;

export const getDictGrapeTypeDetails = gql`
  query getDictGrapeTypeDetails($id: ID) {
    DictOdmianaWinogron(idOdmianaWinogron: $id) {
      idOdmianaWinogron
      nazwa
      opis
    }
  }
`;

export const getDictProcesDetails = gql`
  query getDictProcesDetails($id: ID) {
    DictProcesy(idDictProcesy: $id) {
      idDictProcesy
      nazwa
      opis
      dodatkowe
    }
  }
`;

export const getDictVineyardOperationDetails = gql`
  query getDictVineyardOperationDetails($id: ID) {
    DictOperacjeNaWinnicy(idDictOperacjeNaWinnicy: $id) {
      idDictOperacjeNaWinnicy
      nazwa
      opis
    }
  }
`;

export const getDictWineCategoryDetails = gql`
  query getDictWineCategoryDetails($id: ID) {
    DictKategoriaWina(idDictKategoriaWina: $id) {
      idDictKategoriaWina
      nazwaKategoria
      opis
    }
  }
`;

export const getGrapeHarvestDetails = gql`
  query getGrapeHarvestDetails($id: ID) {
    Winobranie(idWinobranie: $id) {
      idWinobranie
    dataWinobrania
    iloscZebranychWinogron
    winnica{
      nazwa
      dictOdmianaWinogron{
        nazwa
      }
    }
    partie{
      idPartie 
      dataUtworzenia      
    }
    }
  }
`;

export const getItemInStockDetails = gql`
  query getItemInStockDetails($id: ID) {
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

export const getOperationDetails = gql`
  query getOperationDetails($id: ID, $idFK: String!) {
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

export const getVineyardDetails = gql`
  query getVineyardDetails($id: ID!, $idFK: String!) {
    Winnica(idWinnica: $id) {
      nazwa
      powierzchnia
      terroir
    stan
    dataOstatniegoZbioru
      dataZasadzenia
      ewidencyjnyIdDzialki
      dictOdmianaWinogron {
        opis
        nazwa
      }
     }
     Winobranie(winnicaIdWinnica: $idFK){
    idWinobranie
    dataWinobrania
    iloscZebranychWinogron
  }
  OperacjeNaWinnicy(winnicaIdWinnica: $idFK){
    data
    dictOperacjeNaWinnicy{
      nazwa
    }
  }
  }
`;


export const getWarehouseDetails = gql`
  query getWarehouseDetails($id: ID) {
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

export const getWaybillDetails = gql`
  query getWaybillDetails($id: ID!, $idFK: String!) {
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

export const getWineInformationDetails = gql`
  query getWineInformationDetails($id: ID) {
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
    }
  }
`;
