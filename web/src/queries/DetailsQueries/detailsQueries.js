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
      winobranie {
        idWinobranie
        dataWinobrania
      }
      typPartii {
        nazwa
        jednostka
      }
      informacjeOWinie {
        idInformacjeOWinie
        nazwa
        motto
        zawartoscPotAlergenow
        wartoscEnergetyczna
        kategoriaWina {
          nazwaKategoria
        }
      }
      partie {
        idPartie
        dataUtworzenia
        ilosc
      }
      operacje {
        idOperacja
        opis
        dataPoczatku
        dataZakonczenia
        dictProcesy {
          nazwa
        }
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

export const getGrapeHarvestDetails = gql`
  query getGrapeHarvestDetails($id: ID) {
    Winobranie(idWinobranie: $id) {
      idWinobranie
      dataWinobrania
      iloscZebranychWinogron
      winnica {
        nazwa
        dictOdmianaWinogron {
          nazwa
        }
      }
      partie {
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
    Winobranie(winnicaIdWinnica: $idFK) {
      idWinobranie
      dataWinobrania
      iloscZebranychWinogron
    }
    OperacjeNaWinnicy(winnicaIdWinnica: $idFK) {
      data
      dictOperacjeNaWinnicy {
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
      pozycjaWMagazynie {
        idPozycja
        nazwa
        ilosc
        stanAktualny
        kategorie {
          nazwa
        }
      }
    }
  }
`;

export const getWaybillDetails = gql`
  query getWaybillDetails($id: ID!) {
    ListPrzewozowy(idListPrzewozowy: $id) {
      idListPrzewozowy
      imieKierowcy
      nazwiskoKierowcy
      uwagiPrzewoznika
      zastrzezeniaOdbiorcy
      kontrahent {
        nazwaSpolki
        typ
      }
      adres {
        miasto
        kodPocztowy
        ulica
        nrLokalu
        nrPosesji
        kraj
        miejsce
      }
      eDokument
      przesylka {
        nazwaPrzesylki
        ciezarLadunku
        data
        pozycjaWMagazynie {
          idPozycja
          nazwa
          iloscFromJoinTable
          opis
          kategorie {
            jednostka
          }
        }
      }
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
