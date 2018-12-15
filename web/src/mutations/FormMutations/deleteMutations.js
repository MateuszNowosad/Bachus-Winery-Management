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

export const deleteDictWineCategory = gql`
  mutation deleteDictWineCategory($dictWineCategoryId: ID) {
    deleteDictKategoriaWina(idDictKategoriaWina: $dictWineCategoryId) {
      idDictKategoriaWina
    }
  }
`;

export const deleteDictCategory = gql`
  mutation deleteDictCategory($dictCategoryId: ID) {
    deleteDictKategorie(idKategorie: $dictCategoryId) {
      idKategorie
    }
  }
`;

export const deleteDictGrapeType = gql`
  mutation deleteDictGrapeType($dictGrapeTypeId: ID) {
    deleteDictOdmianaWinogron(idOdmianaWinogron: $dictGrapeTypeId) {
      idOdmianaWinogron
    }
  }
`;

export const deleteDictVineyardOperation = gql`
  mutation deleteDictVineyardOperation($dictVineyardOperationId: ID) {
    deleteDictOperacjeNaWinnicy(idDictOperacjeNaWinnicy: $dictVineyardOperationId) {
      idDictOperacjeNaWinnicy
    }
  }
`;

export const deleteDictProcess = gql`
  mutation deleteDictProcess($dictProcessId: ID) {
    deleteDictProcesy(idDictProcesy: $dictProcessId) {
      idDictProcesy
    }
  }
`;

export const deleteDictUserRole = gql`
  mutation deleteDictUserRole($dictUserRoleId: ID) {
    deleteDictRolaUzytkownikow(idRolaUzytkownikow: $dictUserRoleId) {
      idRolaUzytkownikow
    }
  }
`;

export const deleteDictBatchType = gql`
  mutation deleteDictBatchType($dictBatchTypeId: ID) {
    deleteDictTypPartii(idTypPartii: $dictBatchTypeId) {
      idTypPartii
    }
  }
`;

export const deleteWineInformation = gql`
  mutation deleteWineInformation($wineInformationId: ID) {
    deleteInformacjeOWinie(idInformacjeOWinie: $wineInformationId) {
      idInformacjeOWinie
    }
  }
`;

export const deleteWaybill = gql`
  mutation deleteWaybill($waybillId: ID) {
    deleteListPrzewozowy(idListPrzewozowy: $waybillId) {
      idListPrzewozowy
    }
  }
`;

export const deleteWarehouse = gql`
  mutation deleteWarehouse($warehouseId: ID) {
    deleteMagazyn(idMagazyn: $warehouseId) {
      idMagazyn
    }
  }
`;

export const deleteOperations = gql`
  mutation deleteOperations($operationId: ID) {
    deleteOperacje(idOperacja: $operationId) {
      idOperacja
    }
  }
`;

export const deleteVineyardOperation = gql`
  mutation deleteVineyardOperation($vineyardOperationId: ID) {
    deleteOperacjeNaWinnicy(idOperacja: $vineyardOperationId) {
      idOperacja
    }
  }
`;

//TODO sprawdzić
export const deleteProductionPlan = gql`
  mutation deleteProductionPlan($productionPlanId: ID) {
    deletePlanyProdukcyjne(idPlanyProdukcyjne: $productionPlanId) {
      idPlanyProdukcyjne
    }
  }
`;

export const deleteItemInStock = gql`
  mutation deleteItemInStock($itemInStockId: ID) {
    deletePozycjaWMagazynie(idPozycja: $itemInStockId) {
      idPozycja
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($userId: ID) {
    deleteUzytkownicy(idUzytkownika: $userId) {
      idUzytkownika
    }
  }
`;

export const deleteVineyard = gql`
  mutation deleteVineyard($vineyardId: ID) {
    deleteWinnica(idWinnica: $vineyardId) {
      idWinnica
    }
  }
`;

export const deleteGrapeHarvest = gql`
  mutation deleteGrapeHarvest($grapeHarvestId: ID) {
    deleteWinobranie(idWinobranie: $grapeHarvestId) {
      idWinobranie
    }
  }
`;
