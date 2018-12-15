import gql from 'graphql-tag';

export const upsertBatch = gql`
  mutation upsertBatch(
    $batchId: ID
    $amount: Float!
    $desc: String
    $creationDate: String!
    $batchTypeId: String!
    $grapeHarvestId: String
    $parentBatchId: String
  ) {
    upsertPartie(
      idPartie: $batchId
      ilosc: $amount
      opis: $desc
      dataUtworzenia: $creationDate
      typPartiiIdTypPartii: $batchTypeId
      winobranieIdWinobranie: $grapeHarvestId
      partieIdPartie: $parentBatchId
    ) {
      idPartie
    }
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

export const upsertDictWineCategory = gql`
  mutation upsertDictWineCategory($dictWineCategoryId: ID, $name: String!, $desc: String) {
    upsertDictKategoriaWina(idDictKategoriaWina: $dictWineCategoryId, nazwaKategoria: $name, opis: $desc) {
      idDictKategoriaWina
    }
  }
`;

export const upsertDictCategory = gql`
  mutation upsertDictCategory($dictCategoryId: ID, $name: String!, $unit: String!, $desc: String) {
    upsertDictKategorie(idKategorie: $dictCategoryId, nazwa: $name, jednostka: $unit, opis: $desc) {
      idKategorie
    }
  }
`;

export const upsertDictGrapeType = gql`
  mutation upsertDictGrapeType($dictGrapeTypeId: ID, $name: String!, $desc: String) {
    upsertDictOdmianaWinogron(idOdmianaWinogron: $dictGrapeTypeId, nazwa: $name, opis: $desc) {
      idOdmianaWinogron
    }
  }
`;

export const upsertDictVineyardOperation = gql`
  mutation upsertDictVineyardOperation($dictVineyardOperationId: ID, $name: String!, $desc: String) {
    upsertDictOperacjeNaWinnicy(idDictOperacjeNaWinnicy: $dictVineyardOperationId, nazwa: $name, opis: $desc) {
      idDictOperacjeNaWinnicy
    }
  }
`;

export const upsertDictProcess = gql`
  mutation upsertDictProcess($dictProcessId: ID, $name: String!, $desc: String, $additional: String) {
    upsertDictProcesy(idDictProcesy: $dictProcessId, nazwa: $name, opis: $desc, dodatkowe: $additional) {
      idDictProcesy
    }
  }
`;

export const upsertDictUserRole = gql`
  mutation upsertDictUserRole($dictUserRoleId: ID, $name: String!, $desc: String, $type: String) {
    upsertDictRolaUzytkownikow(idRolaUzytkownikow: $dictUserRoleId, nazwa: $name, opis: $desc, typ: $type) {
      idRolaUzytkownikow
    }
  }
`;

export const upsertDictBatchType = gql`
  mutation upsertDictBatchType($dictBatchTypeId: ID, $name: String!, $unit: String!) {
    upsertDictTypPartii(idTypPartii: $dictBatchTypeId, nazwa: $name, jednostka: $unit) {
      idTypPartii
    }
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
