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

//TODO dodawanie adresu
export const upsertContractors = gql`
  mutation upsertContractors(
    $contractorId: ID
    $NIP: String
    $companyName: String
    $phoneNumber: String
    $eMail: String
    $wwwSite: String
    $KRS: String
    $accountNumber: String
    $fax: String
    $addressId: String
  ) {
    upsertKontrahenci(
      idKontrahenci: $contractorId
      NIP: $NIP
      nazwaSpolki: $companyName
      telefon: $phoneNumber
      eMail: $eMail
      stronaWww: $wwwSite
      KRS: $KRS
      nrKonta: $accountNumber
      fax: $fax
      adresIdAdres: $addressId
    ) {
      idKontrahenci
    }
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
export const upsertWineInformation = gql`
  mutation upsertWineInformation(
    $wineInformationId: ID
    $name: String!
    $motto: String!
    $allergens: String
    $energyValue: String!
    $wineCategoryId: String!
  ) {
    upsertInformacjeOWinie(
      idInformacjeOWinie: $wineInformationId
      nazwa: $name
      motto: $motto
      zawartoscPotAlergenow: $allergens
      wartoscEnergetyczna: $energyValue
      dictKategoriaWinaIdDictKategoriaWina: $wineCategoryId
    ) {
      idInformacjeOWinie
    }
  }
`;

//TODO dodawanie przesyłki, kontrahentów i adresów
export const upsertWaybill = gql`
  mutation upsertWaybill(
    $waybillId: ID
    $driverName: String
    $driverSurname: String
    $comments: String
    $reservations: String
    $fileURL: String
    $parcelID: String
  ) {
    upsertListPrzewozowy(
      idListPrzewozowy: $waybillId
      imieKierowcy: $driverName
      nazwiskoKierowcy: $driverSurname
      uwagiPrzewoznika: $comments
      zastrzezeniaOdbiorcy: $reservations
      eDokument: $fileURL
      przesylkaIdPrzesylka: $parcelID
    ) {
      idListPrzewozowy
    }
  }
`;

//TODO dodawanie adresu
export const upsertWarehouse = gql`
  mutation upsertWarehouse($warehouseId: ID, $type: String!, $capacity: Float!) {
    upsertMagazyn(idMagazyn: $warehouseId, rodzaj: $type, pojemnosc: $capacity) {
      idMagazyn
    }
  }
`;

//TODO dodawanie partii i pozycji w magazynie
export const upsertOperations = gql`
  mutation upsertOperations(
    $operationId: ID
    $beginAmount: Float!
    $endAmount: Float
    $beginDate: String!
    $endDate: String!
    $alcoholContent: Float
    $additiveAmount: Float
    $sugarContent: Float
    $acidity: Float
    $temperature: Float
    $desc: String
    $userId: String!
    $processId: String!
  ) {
    upsertOperacje(
      idOperacja: $operationId
      iloscPrzed: $beginAmount
      iloscPo: $endAmount
      dataPoczatku: $beginDate
      dataZakonczenia: $endDate
      zawartoscAlkoholu: $alcoholContent
      iloscDodatku: $additiveAmount
      zawartoscCukru: $sugarContent
      kwasowosc: $acidity
      temperatura: $temperature
      opis: $desc
      uzytkownicyIdUzytkownicy: $userId
      dictProcesyIdDictProcesy: $processId
    ) {
      idOperacja
    }
  }
`;

export const upsertVineyardOperation = gql`
  mutation upsertVineyardOperation(
    $vineyardOperationId: ID
    $dateOfOperation: String
    $desc: String
    $dictOperationId: String!
    $vineyardId: String!
  ) {
    upsertOperacjeNaWinnicy(
      idOperacja: $vineyardOperationId
      data: $dateOfOperation
      opis: $desc
      dictOperacjeNaWinnicyIdDictOperacjeNaWinnicy: $dictOperationId
      winnicaIdWinnica: $vineyardId
    ) {
      idOperacja
    }
  }
`;

//TODO niepewne
export const upsertProductionPlan = gql`
  mutation upsertProductionPlan($productionPlanId: ID, $name: String!, $desc: String, $eDocument: String!) {
    upsertPlanyProdukcyjne(idPlanyProdukcyjne: $productionPlanId, nazwa: $name, opis: $desc, eDokument: $eDocument) {
      idPlanyProdukcyjne
    }
  }
`;

//TODO poprawić partie
export const upsertItemInStock = gql`
  mutation upsertItemInStock(
    $itemInStockId: ID
    $name: String!
    $desc: String
    $amount: Float!
    $barcode: String!
    $actualState: String!
    $acceptanceDate: String!
    $releaseDate: String
    $sectorName: String!
    $categoryId: String!
    $warehouseId: String!
    $batchId: String
  ) {
    upsertPozycjaWMagazynie(
      idPozycja: $itemInStockId
      nazwa: $name
      opis: $desc
      ilosc: $amount
      kodKreskowy: $barcode
      stanAktualny: $actualState
      dataPrzyjecia: $acceptanceDate
      dataWydania: $releaseDate
      nazwaSektora: $sectorName
      kategorieIdKategorie: $categoryId
      magazynIdMagazyn: $warehouseId
      partieIdPartie: $batchId
    ) {
      idPozycja
    }
  }
`;

//TODO dodawanie adresu
export const upsertUser = gql`
  mutation upsertUser(
    $userId: ID
    $firstName: String!
    $lastName: String!
    $login: String!
    $password: String!
    $PESEL: String!
    $eMail: String!
    $phoneNumber: String!
    $lastLoginDate: String!
    $photoURL: String
    $isActive: String!
    $userRoleId: String!
  ) {
    upsertUzytkownicy(
      idUzytkownika: $userId
      imie: $firstName
      nazwisko: $lastName
      login: $login
      haslo: $password
      PESEL: $PESEL
      eMail: $eMail
      nrTelefonu: $phoneNumber
      dataOstatniegoLogowania: $lastLoginDate
      zdjecie: $photoURL
      czyAktywne: $isActive
      rola: $userRoleId
    ) {
      idUzytkownika
    }
  }
`;

export const upsertVineyard = gql`
  mutation upsertVineyard(
    $vineyardId: ID
    $name: String!
    $area: Float!
    $state: String!
    $terroir: String
    $dateOfPlanting: String!
    $registrationPlotId: String!
    $grapeTypeId: String!
  ) {
    upsertWinnica(
      idWinnica: $vineyardId
      nazwa: $name
      powierzchnia: $area
      stan: $state
      terroir: $terroir
      dataZasadzenia: $dateOfPlanting
      ewidencyjnyIdDzialki: $registrationPlotId
      odmianiaWinogronIdOdmianaWinogron: $grapeTypeId
    ) {
      idWinnica
    }
  }
`;

export const upsertGrapeHarvest = gql`
  mutation upsertGrapeHarvest($grapeHarvestId: ID, $dateOfHarvest: String!, $amount: Float!, $vineyardId: String!) {
    upsertWinobranie(
      idWinobranie: $grapeHarvestId
      dataWinobrania: $dateOfHarvest
      iloscZebranychWinogron: $amount
      winnicaIdWinnica: $vineyardId
    ) {
      idWinobranie
    }
  }
`;
