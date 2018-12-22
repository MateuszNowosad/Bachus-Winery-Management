import gql from 'graphql-tag';

export const deleteBatch = gql`
  mutation deleteBatch($id: ID) {
    deletePartie(idPartie: $id) {
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

const parcel = data => `
 {
 ${data.idParcel ? 'idPrzesylka: ' + data.idParcel + ',' : ''}
  nazwaPrzesylki: ${data.packageName},
  ciezarLadunku: ${data.weight},
  data: ${data.date},
  pozycjaWMagazynie: 
 }
`;

export const deleteContractors = gql`
  mutation deleteContractors($id: ID) {
    deleteKontrahenci(idKontrahenci: $id) {
      idKontrahenci
    }
  }
`;

export const deleteDictWineCategory = gql`
  mutation deleteDictWineCategory($id: ID) {
    deleteDictKategoriaWina(idDictKategoriaWina: $id) {
      idDictKategoriaWina
    }
  }
`;

export const deleteDictCategory = gql`
  mutation deleteDictCategory($id: ID) {
    deleteDictKategorie(idKategorie: $id) {
      idKategorie
    }
  }
`;

export const deleteDictGrapeType = gql`
  mutation deleteDictGrapeType($id: ID) {
    deleteDictOdmianaWinogron(idOdmianaWinogron: $id) {
      idOdmianaWinogron
    }
  }
`;

export const deleteDictVineyardOperation = gql`
  mutation deleteDictVineyardOperation($id: ID) {
    deleteDictOperacjeNaWinnicy(idDictOperacjeNaWinnicy: $id) {
      idDictOperacjeNaWinnicy
    }
  }
`;

export const deleteDictProcess = gql`
  mutation deleteDictProcess($id: ID) {
    deleteDictProcesy(idDictProcesy: $id) {
      idDictProcesy
    }
  }
`;

export const deleteDictUserRole = gql`
  mutation deleteDictUserRole($id: ID) {
    deleteDictRolaUzytkownikow(idRolaUzytkownikow: $id) {
      idRolaUzytkownikow
    }
  }
`;

export const deleteDictBatchType = gql`
  mutation deleteDictBatchType($id: ID) {
    deleteDictTypPartii(idTypPartii: $id) {
      idTypPartii
    }
  }
`;

export const deleteWineInformation = gql`
  mutation deleteWineInformation($id: ID) {
    deleteInformacjeOWinie(idInformacjeOWinie: $id) {
      idInformacjeOWinie
    }
  }
`;

export const deleteWaybill = gql`
  mutation deleteWaybill($id: ID) {
    deleteListPrzewozowy(idListPrzewozowy: $id) {
      idListPrzewozowy
    }
  }
`;

export const deleteWarehouse = gql`
  mutation deleteWarehouse($id: ID) {
    deleteMagazyn(idMagazyn: $id) {
      idMagazyn
    }
  }
`;

export const deleteOperations = gql`
  mutation deleteOperations($id: ID) {
    deleteOperacje(idOperacja: $id) {
      idOperacja
    }
  }
`;

export const deleteVineyardOperation = gql`
  mutation deleteVineyardOperation($id: ID) {
    deleteOperacjeNaWinnicy(idOperacja: $id) {
      idOperacja
    }
  }
`;

//TODO sprawdzić
export const deleteProductionPlan = gql`
  mutation deleteProductionPlan($id: ID) {
    deletePlanyProdukcyjne(idPlanyProdukcyjne: $id) {
      idPlanyProdukcyjne
    }
  }
`;

export const deleteItemInStock = gql`
  mutation deleteItemInStock($id: ID) {
    deletePozycjaWMagazynie(idPozycja: $id) {
      idPozycja
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($id: ID) {
    deleteUzytkownicy(idUzytkownika: $id) {
      idUzytkownika
    }
  }
`;

export const deleteVineyard = gql`
  mutation deleteVineyard($id: ID) {
    deleteWinnica(idWinnica: $id) {
      idWinnica
    }
  }
`;

export const deleteGrapeHarvest = gql`
  mutation deleteGrapeHarvest($id: ID) {
    deleteWinobranie(idWinobranie: $id) {
      idWinobranie
    }
  }
`;
