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
    $isRecipe: String
  ) {
    upsertPartie(
      idPartie: $batchId
      ilosc: $amount
      opis: $desc
      dataUtworzenia: $creationDate
      czyPrzepis: $isRecipe
      typPartiiIdTypPartii: $batchTypeId
      winobranieIdWinobranie: $grapeHarvestId
      partieIdPartie: $parentBatchId
    ) {
      idPartie
    }
  }
`;

// export const upsertAddress = gql`
//   mutation upsertAddress(
//     $addressId: ID
//     $street: String
//     $buildingNumber: String
//     $apartmentNumber: String
//     $postalCode: String
//     $city: String
//     $country: String
//   ) {
//     upsertAdres(
//       idAdres: $addressId
//       miasto: $city
//       kodPocztowy: $postalCode
//       ulica: $street
//       nrLokalu: $apartmentNumber
//       nrPosesji: $buildingNumber
//       kraj: $country
//     ) {
//       idAdres
//     }
//   }
// `;

export const contractorAddress = gql`
  mutation contractorAddress($idKontrahenci: ID!, $idAdres: String!) {
    upsertKontrahenci(idKontrahenci: $idKontrahenci, adresIdAdres: $idAdres) {
      idKontrahenci
    }
  }
`;

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
    $addressIdFK: String = "1"
    $addressId: ID
    $street: String
    $buildingNumber: String
    $apartmentNumber: String
    $postalCode: String
    $city: String
    $country: String
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
      adresIdAdres: $addressIdFK
    ) {
      idKontrahenci
    }
    upsertAdres(
      idAdres: $addressId
      miasto: $city
      kodPocztowy: $postalCode
      ulica: $street
      nrLokalu: $apartmentNumber
      nrPosesji: $buildingNumber
      kraj: $country
    ) {
      idAdres
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

export const wineInformationBatch = gql`
  mutation wineInformationBatch($idInformacjeOWinie: String!, $idPartie: ID!) {
    upsertPartie(idPartie: $idPartie, informacjeOWinieIdInformacjeOWinie: $idInformacjeOWinie) {
      idPartie
    }
  }
`;
//TODO rozrużnianie edycji od dodawania nowego
export const upsertWineInformation = gql`
  mutation upsertWineInformation(
    $wineInformationId: ID
    $name: String!
    $motto: String!
    $allergens: String
    $energyValue: String!
    $wineCategoryId: String!
    $batchId: ID!
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
    upsertPartie(idPartie: $batchId) {
      idPartie
    }
  }
`;

const parcelFK = countFK => {
  let upsert = ``;
  for (let i = 0; i < countFK; i++)
    upsert += `pozycja${i}: upsertPrzesylkaHasPozycjaWMagazynie(
    idPrzesylkaHasPozycjaWMagazynie: $parcelJTid${i}
    przesylkaIdPrzesylka: $idPrzesylka
    pozycjaWMagazynieIdPozycja: $idItemInStock${i}
    ilosc: $amount${i}
  ){
    przesylkaIdPrzesylka
    pozycjaWMagazynieIdPozycja
    ilosc
  }`;
  return upsert;
};

const parcelVariables = countFK => {
  let variables = ``;
  for (let i = 0; i < countFK; i++)
    variables += `$parcelJTid${i}: ID!
    $idItemInStock${i}: String!
    $amount${i}: String!
    `;
  return variables;
};

export const waybillFK = countFK => gql`
  mutation waybillFK(
    $idListPrzewozowy: ID!
    $idListPrzewozowyFK: String!
    $idOdbiorca: String!
    $idNadawca: String!
    $idPrzewoznik: String!
    $idAdresNadania: String!
    $idAdresOdbioru: String!
    $idPrzesylka: String!
    $senderJTId: ID!
    $recipentJTId: ID!
    $carrierJTId: ID!
    $mailingAddressJTId: ID!
    $pickupAddressJTId: ID!
    ${parcelVariables(countFK)}
  ) {
    odbiorca: upsertListPrzewozowyHasKontrahenci(
        idListPrzewozowyHasKontrahenci: $recipentJTId
      listPrzewozowyIdListPrzewozowy: $idListPrzewozowyFK
      kontrahenciIdKontrahenci: $idOdbiorca
      typ: "Odbiorca"
    ) {
      idListPrzewozowyHasKontrahenci
    }
    nadawca: upsertListPrzewozowyHasKontrahenci(
    idListPrzewozowyHasKontrahenci: $senderJTId
      listPrzewozowyIdListPrzewozowy: $idListPrzewozowyFK
      kontrahenciIdKontrahenci: $idNadawca
      typ: "Nadawca"
    ) {
      idListPrzewozowyHasKontrahenci
    }
    przewoznik: upsertListPrzewozowyHasKontrahenci(
        idListPrzewozowyHasKontrahenci: $carrierJTId
      listPrzewozowyIdListPrzewozowy: $idListPrzewozowyFK
      kontrahenciIdKontrahenci: $idPrzewoznik
      typ: "Przewoznik"
    ) {
      idListPrzewozowyHasKontrahenci
    }
    adresNadania: upsertListPrzewozowyHasAdres(
    idListPrzewozowyHasAdres: $mailingAddressJTId
      adresIdAdres: $idAdresNadania
      listPrzewozowyIdListPrzewozowy: $idListPrzewozowyFK
      miejsce: "Nadania"
    ) {
      idListPrzewozowyHasAdres
    }
    adresOdbioru: upsertListPrzewozowyHasAdres(
    idListPrzewozowyHasAdres: $pickupAddressJTId
      adresIdAdres: $idAdresOdbioru
      listPrzewozowyIdListPrzewozowy: $idListPrzewozowyFK
      miejsce: "Odbioru"
    ) {
      idListPrzewozowyHasAdres
    }
    upsertListPrzewozowy(idListPrzewozowy: $idListPrzewozowy, przesylkaIdPrzesylka: $idPrzesylka) {
      idListPrzewozowy
    }
    ${parcelFK(countFK)}
  }
`;

export const upsertWaybill = gql`
  mutation upsertWaybill(
    $waybillId: ID
    $driverName: String
    $driverSurname: String
    $comments: String
    $reservations: String
    $fileURL: String
    $parcelIdFK: String = "1"
    $senderId: ID!
    $recipentId: ID!
    $carrierId: ID!
    $addressIdMailing: ID
    $streetMailing: String
    $buildingNumberMailing: String
    $apartmentNumberMailing: String
    $postalCodeMailing: String
    $cityMailing: String
    $countryMailing: String
    $addressIdPickup: ID
    $streetPickup: String
    $buildingNumberPickup: String
    $apartmentNumberPickup: String
    $postalCodePickup: String
    $cityPickup: String
    $countryPickup: String
    $parcelId: ID
    $packageName: String!
    $weight: Float!
    $date: String!
  ) {
    upsertListPrzewozowy(
      idListPrzewozowy: $waybillId
      imieKierowcy: $driverName
      nazwiskoKierowcy: $driverSurname
      uwagiPrzewoznika: $comments
      zastrzezeniaOdbiorcy: $reservations
      eDokument: $fileURL
      przesylkaIdPrzesylka: $parcelIdFK
    ) {
      idListPrzewozowy
      idListPrzewozowyFK: idListPrzewozowy
    }
    upsertNadawca: upsertKontrahenci(idKontrahenci: $senderId) {
      idNadawca: idKontrahenci
    }
    upsertOdbiorca: upsertKontrahenci(idKontrahenci: $recipentId) {
      idOdbiorca: idKontrahenci
    }
    upsertPrzewoznik: upsertKontrahenci(idKontrahenci: $carrierId) {
      idPrzewoznik: idKontrahenci
    }
    upsertAdresNadania: upsertAdres(
      idAdres: $addressIdMailing
      miasto: $cityMailing
      kodPocztowy: $postalCodeMailing
      ulica: $streetMailing
      nrLokalu: $apartmentNumberMailing
      nrPosesji: $buildingNumberMailing
      kraj: $countryMailing
    ) {
      idAdresNadania: idAdres
    }
    upsertAdresOdbioru: upsertAdres(
      idAdres: $addressIdPickup
      miasto: $cityPickup
      kodPocztowy: $postalCodePickup
      ulica: $streetPickup
      nrLokalu: $apartmentNumberPickup
      nrPosesji: $buildingNumberPickup
      kraj: $countryPickup
    ) {
      idAdresOdbioru: idAdres
    }
    upsertPrzesylka(idPrzesylka: $parcelId, nazwaPrzesylki: $packageName, ciezarLadunku: $weight, data: $date) {
      idPrzesylka
    }
  }
`;

export const warehouseAddress = gql`
  mutation warehouseAddress($idMagazyn: ID!, $idAdres: String!) {
    upsertMagazyn(idMagazyn: $idMagazyn, adresIdAdres: $idAdres) {
      idMagazyn
    }
  }
`;

export const upsertWarehouse = gql`
  mutation upsertWarehouse(
    $warehouseId: ID
    $type: String!
    $capacity: Float!
    $addressId: ID
    $addressIdFK: String = "1"
    $street: String
    $buildingNumber: String
    $apartmentNumber: String
    $postalCode: String
    $city: String
    $country: String
  ) {
    upsertMagazyn(idMagazyn: $warehouseId, rodzaj: $type, pojemnosc: $capacity, adresIdAdres: $addressIdFK) {
      idMagazyn
    }
    upsertAdres(
      idAdres: $addressId
      miasto: $city
      kodPocztowy: $postalCode
      ulica: $street
      nrLokalu: $apartmentNumber
      nrPosesji: $buildingNumber
      kraj: $country
    ) {
      idAdres
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

export const userAddress = gql`
  mutation userAddress($idUzytkownika: ID!, $idAdres: String!) {
    upsertUzytkownicy(idUzytkownika: $idUzytkownika, adresIdAdres: $idAdres) {
      idUzytkownika
    }
  }
`;

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
    $photoURL: String
    $isActive: String!
    $userRoleId: String!
    $lastLoginDate: String!
    $addressIdFK: String = "1"
    $addressId: ID
    $street: String
    $buildingNumber: String
    $apartmentNumber: String
    $postalCode: String
    $city: String
    $country: String
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
      zdjecie: $photoURL
      czyAktywne: $isActive
      dictRolaUzytkownikowIdRolaUzytkownikow: $userRoleId
      dataOstatniegoLogowania: $lastLoginDate
      adresIdAdres: $addressIdFK
    ) {
      idUzytkownika
    }
    upsertAdres(
      idAdres: $addressId
      miasto: $city
      kodPocztowy: $postalCode
      ulica: $street
      nrLokalu: $apartmentNumber
      nrPosesji: $buildingNumber
      kraj: $country
    ) {
      idAdres
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
  mutation upsertGrapeHarvest(
    $grapeHarvestId: ID
    $dateOfHarvest: String!
    $amount: Float!
    $vineyardIdFK: String!
    $vineyardId: ID
  ) {
    upsertWinobranie(
      idWinobranie: $grapeHarvestId
      dataWinobrania: $dateOfHarvest
      iloscZebranychWinogron: $amount
      winnicaIdWinnica: $vineyardIdFK
    ) {
      idWinobranie
    }
    upsertWinnica(idWinnica: $vineyardId, dataOstatniegoZbioru: $dateOfHarvest) {
      idWinnica
    }
  }
`;
