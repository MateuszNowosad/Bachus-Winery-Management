export const upsertBatch = data => gql`
  mutation {
    upsertPartie(
    ${data.idPartie ? 'idPartie: ' + data.idPartie + ',' : ''}
    ilosc: ${data.amount},
    ${data.amount ? 'opis: ' + data.amount + ',' : ''}
    dataUtworzenia: ${data.creationDate},
    typPartii: { idTypPartii: ${data.batchType.id} },
    ${data.grapeHarvest ? 'winobranie: { ' + data.grapeHarvest.id + '},' : ''}
    ${data.batch ? 'partie: { ' + data.batch.id + '},' : ''}
    )
  }
`;

const address = data => `
  {
    ${data.idAddress ? 'idAdres: ' + data.idAddress + ',' : ''} 
    miasto: ${data.city},
    kodPocztowy: ${data.postalCode},
    ulica: ${data.street},
    ${data.apartmentNumber ? 'nrLokalu: ' + data.apartmentNumber + ',' : ''}
    nrPosesji: ${data.buildingNumber},
    kraj: ${data.country},
  }
`;

//TODO dodawanie pzocycji w magazynie
const parcel = data => `
 {
 ${data.idParcel ? 'idPrzesylka: ' + data.idParcel + ',' : ''}
  nazwaPrzesylki: ${data.packageName},
  ciezarLadunku: ${data.weight},
  data: ${data.date},
  pozycjaWMagazynie: 
 }
`;

export const upsertContractors = data => gql`
  mutation {
    upsertKontrahenci(
      ${data.idContractor ? 'idKontrahenci: ' + data.idContractor : ''}
      ${data.NIP ? 'NIP: ' + data.NIP : ''}
      nazwaSpolki: ${data.companyName},
      telefon: ${data.phoneNumber},
      eMail: ${data.eMaila},
      ${data.wwwSite ? 'stronaWww: ' + data.wwwSite : ''}
      ${data.KRS ? 'KRS: ' + data.KRS : ''}
      nrKonta: ${data.accountNumber},
      ${data.fax ? 'fax: ' + data.fax : ''}
      adres: ${address(data.address)},    
    )
  }
  `;

export const upsertDictWineCategory = data => gql`
  mutation {
    upsertDictKategoriaWina(
      ${data.idDictWineCategory ? 'idDictKategoriaWina: ' + data.idDictWineCategory + ',' : ''}
      nazwaKategoria: ${data.name},
      ${data.desc ? 'opis: ' + data.desc + ',' : ''} 
    )
  }
`;

export const upsertDictCategory = data => gql`
  mutation {
    upsertDictKategorie(
       ${data.idDictCategory ? 'idKategorie: ' + data.idDictCategory + ',' : ''}
  nazwa: ${data.name},
  jednostka: ${data.unit},
  ${data.desc ? 'opis: ' + data.desc + ',' : ''}  
    )
  }
`;

export const upsertDictGrapeType = data => gql`
  mutation {
    upsertDictOdmianaWinogron(
      ${data.idDictGrapeType ? 'idOdmianaWinogron: ' + data.idDictGrapeType + ',' : ''}
  nazwa: ${data.name},
  ${data.desc ? 'opis: ' + data.desc + ',' : ''}
    )
  }
`;

export const upsertDictVineyardOperation = data => gql`
mutation {
    upsertDictOperacjeNaWinnicy(
      ${data.idDictVineyardOperation ? 'DictOperacjeNaWinnicy: ' + data.idDictVineyardOperation + ',' : ''}
  nazwa: ${data.name},
  ${data.desc ? 'opis: ' + data.desc + ',' : ''}
    )
  }
`;

export const upsertDictProcess = data => gql`
mutation {
    upsertDictProcesy(
     ${data.idDictProcess ? 'idDictProcesy: ' + data.idDictProcess + ',' : ''} 
  nazwa: ${data.name},
  ${data.desc ? 'opis: ' + data.desc + ',' : ''},
  ${data.addditional ? 'dodatkowe: ' + data.addditional + ',' : ''} 
    )
  }
`;

export const upsertDictUserRole = data => gql`
mutation {
    upsertDictRolaUzytkownikow(
  ${data.idDictUserRole ? 'idRolaUzytkownikow: ' + data.idDictUserRole + ',' : ''} 
  nazwa: ${data.name},
  ${data.desc ? 'opis: ' + data.desc + ',' : ''},
  ${data.type ? 'typ: ' + data.type + ',' : ''} 
    )
  }
`;

export const upsertDictBatchType = data => gql`
  mutation {
    upsertDictRolaUzytkownikow(
  ${data.idDictBatchType ? 'idTypPartii: ' + data.idDictBatchType + ',' : ''} 
  nazwa: ${data.name},
  jednostka: ${data.unit}
    )  
  }
`;

//TODO rozwiązać jak dodać informacje o winie do partii
export const upsertWineInformation = data => gql`
mutation {
    upsertInformacjeOWinie(
  ${data.idWineInformation ? 'idInformacjeOWinie: ' + data.idWineInformation + ',' : ''} 
  nazwa: ${data.name},
  motto: ${data.motto},
  ${data.allergens ? 'zawartoscPotAlergenow: ' + data.allergens + ',' : ''}
  wartoscEnergetyczna: ${data.energyValue},
  kategoriaWina: { idDictKategoriaWina: ${data.wineCategory.id}
  partie: 
    )
  }
`;

//TODO dodawanie kontrahentów i adresów
export const upsertWaybill = data => gql`
mutation {
    upsertListPrzewozowy(
  ${data.idWaybill ? 'idListPrzewozowy: ' + data.idWaybill + ',' : ''} 
  imieKierowcy: ${data.driverName},
  nazwiskoKierowcy: ${data.driverSurname},
  ${data.comments ? 'uwagiPrzewoznika: ' + data.comments + ',' : ''} 
  ${data.reservations ? 'zastrzezeniaOdbiorcy: ' + data.reservations + ',' : ''}
  eDokument: ${data.fileURL},
  kontrahent: [Kontrahenci]
  przesylka: ${parcel(data.parcel)},
  adres: [Adres]
    )
  }
`;

export const upsertWarehouse = data => gql`
mutation {
    upsertMagazyn(
  ${data.idWarehouse ? 'idMagazyn: ' + data.idWarehouse + ',' : ''} 
  rodzaj: ${data.type},
  pojemnosc: ${data.capacity},
  adres: ${address(data.address)}
    )
  }
`;

//TODO dodawanie partii i pozycji w magazynie
export const upsertOperations = data => gql`
mutation {
    upsertOperacje(
  ${data.idOperation ? 'idOperacja: ' + data.idOperation + ',' : ''} 
  iloscPrzed: ${data.beginAmount},
  ${data.endAmount ? 'iloscPo: ' + data.endAmount + ',' : ''} 
  dataPoczatku: ${data.beginDate},
  dataZakonczenia: ${data.endDate},
  ${data.alcoholContent ? 'zawartoscAlkoholu: ' + data.alcoholContent + ',' : ''} 
  ${data.additiveAmount ? 'iloscDodatku: ' + data.additiveAmount + ',' : ''} 
  ${data.sugarContent ? 'zawartoscCukru: ' + data.sugarContent + ',' : ''} 
  ${data.acidity ? 'kwasowosc: ' + data.acidity + ',' : ''} 
  ${data.temperature ? 'temperatura: ' + data.temperature + ',' : ''} 
  ${data.desc ? 'opis: ' + data.desc + ',' : ''} 
  uzytkownicy: {idUzytkownika: ${data.idUser} },
  dictProcesy: {idDictProcesy: ${data.process.id}},
  pozycjaWMagazynie: [PozycjaWMagazynie]
  partie: [Partie]
    )
  }
`;

export const upsertVineyardOperation = data => gql`
mutation {
    upsertOperacjeNaWinnicy(
  ${data.idVineyardOperation ? 'idOperacja: ' + data.idVineyardOperation + ',' : ''} 
  data: ${data.dateOfOperation},
  ${data.desc ? 'opis: ' + data.desc + ',' : ''} 
  dictOperacjeNaWinnicy: {idDictOperacjeNaWinnicy: ${data.dictOperation.id}},
  winnica: {idWinnica: ${data.vineyard}}
    )
  }
`;

//TODO mutacja plany produkcyjne

//TODO poprawić partie
export const upsertItemInStock = data => gql`
mutation {
    upsertPozycjaWMagazynie(
  ${data.idItemInStock ? 'idPozycja: ' + data.idItemInStock + ',' : ''} 
  nazwa: ${data.name},
  ${data.desc ? 'opis: ' + data.desc + ',' : ''} 
  ilosc: ${data.amount},
  kodKreskowy: ${data.barcode}, 
  stanAktualny: ${data.actualState},
  dataPrzyjecia: ${data.acceptanceDate},
  ${data.releaseDate ? 'dataWydania: ' + data.releaseDate + ',' : ''} 
  nazwaSektora: ${data.sectorName},
  kategorie: {idKategoria: ${data.category.id}},
  magazyn: {idMagazyn: ${data.warehouseid}},
  ${data.batch ? 'partie: ' + data.batch + ',' : ''} 
    )
  }
`;

export const upsertUser = data => gql`
mutation {
    upsertUzytkownicy(
  ${data.idUser ? 'idUzytkownika: ' + data.idUser + ',' : ''} 
  imie: ${data.firstName},
  nazwisko: ${data.lastName},
  login: ${data.login},
  haslo: ${data.password},
  PESEL: ${data.PESEL},
  eMail: ${data.eMail},
  nrTelefonu: ${data.phoneNumber},
  dataOstatniegoLogowania: ${data.dataOstatniegoLogowania},
  ${data.photoURL ? 'zdjecie: ' + data.photoURL + ',' : ''} 
  czyAktywne: ${data.isActive},
  adres: ${address(data.address)},
  rola: {idRolaUzytkownikow: ${data.userRole.id}},
    )
  }
`;

export const upsertVineyard = data => gql`
mutation {
    upsertWinnica(
  ${data.idVineyard ? 'idWinnica: ' + data.idVineyard + ',' : ''} 
  nazwa: ${data.name},
  powierzchnia: ${data.area},
  stan: ${data.state},
  ${data.terroir ? 'terroir: ' + data.terroir + ',' : ''}  
  dataZasadzenia: ${data.dateOfPlanting},
  ewidencyjnyIdDzialki: ${data.registrationPlotId}
  dictOdmianaWinogron: {idOdmianaWinogron ${data.grapeType.id}  
    )
  }
`;

export const upsertGrapeHarvest = data => gql`
mutation {
    upsertWinobranie(
  ${data.idGrapeHarvest ? 'idWinobranie: ' + data.idGrapeHarvest + ',' : ''} 
 dataWinobrania: ${data.dateOfHarvest},
  iloscZebranychWinogron: ${data.amount},
  winnica: {idWinnica: ${data.vineyardid}}
    )
  }
`;
