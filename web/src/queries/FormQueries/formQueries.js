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

export const getDictProcesForForm = dictProcesID => gql`
  {
  DictProcesy(idDictProcesy ${dictProcesID}) {
  idDictProcesy
  nazwa
  opis
  dodatkowe
}
}
`;

export const getDictVineyardOperationForForm = dictVineyardOperationID => gql`
{
DictOperacjeNaWinnicy(idDictOperacjeNaWinnicy: ${dictVineyardOperationID}) {
  idDictOperacjeNaWinnicy
  nazwa
  opis
}
}`;

export const getDictWineCategoryForForm = dictWineCategoryID => gql`
{
DictKategoriaWina(idDictKategoriaWina: ${dictWineCategoryID}) {
  idDictKategoriaWina
  nazwaKategoria
  opis
}
}
`;

export const getGrapeHarvestForForm = grapeHarvestID => gql`
  {
    Winobranie(idWinobranie ${grapeHarvestID}) {
      idWinobranie
      dataWinobrania
      iloscZebranychWinogron
    }
  }
`;

export const getItemInStockForForm = itemInStockID => gql`
{
PozycjaWMagazynie(idPozycja: ${itemInStockID}) {
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
}
}
`;

export const getOperationForForm = operationID => gql`
  {
    Operacje(idOperacja: ${operationID}) {
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
      }
    }
  }
`;

export const getVineyardForForm = vineyardID => gql`
{
  Winnica(idWinnica: ${vineyardID}) {
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

export const getVineyardOperationForForm = vineyardOperationID => gql`
{
  OperacjeNaWinnicy(idOperacja: ${vineyardOperationID}) {
    idOperacja
    data
    opis
    dictOperacjeNaWinnicy {
      idDictOperacjeNaWinnicy
      nazwa
    }
  }
}
`;

export const getWarehouseForForm = warehouseID => gql`
  {
    Magazyn(idMagazyn: ${warehouseID}) {
      idMagazyn
      rodzaj
      pojemnosc
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

export const getWaybillForForm = waybillID => gql`
  {
    ListPrzewozowy(idListPrzewozowy: ${waybillID}) {
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
      }
      przesylka {
        idPrzesylka
        nazwaPrzesylki
        ciezarLadunku
        data
        pozycjaWMagazynie {
          idPozycja
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
  }
`;

export const getWineInformationForForm = wineInformationID => gql`
{
 InformacjeOWinie(idInformacjeOWinie: ${wineInformationID}) {
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
