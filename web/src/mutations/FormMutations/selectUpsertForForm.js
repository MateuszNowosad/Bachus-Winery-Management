import {
  contractorAddress,
  upsertBatch,
  upsertContractors,
  upsertDictBatchType,
  upsertDictCategory,
  upsertDictGrapeType,
  upsertDictProcess,
  upsertDictUserRole,
  upsertDictVineyardOperation,
  upsertDictWineCategory,
  upsertGrapeHarvest,
  upsertItemInStock,
  upsertOperations,
  upsertUser,
  upsertVineyard,
  upsertVineyardOperation,
  upsertWarehouse,
  upsertWaybill,
  upsertWineInformation,
  warehouseAddress,
  wineInformationBatch
} from './upsertMutations';

export const selectUpsertForForm = formName => {
  switch (formName) {
    case 'FormUsers':
      return {
        query: upsertUser
        // simple: 0
      };
    case 'FormBatches':
      return {
        query: upsertBatch,
        simple: 1
      };
    case 'FormContractors':
      return {
        query: upsertContractors,
        simple: 0,
        fkQuery: contractorAddress
      };
    case 'FormDictUserRole':
      return {
        query: upsertDictUserRole,
        simple: 1
      };
    case 'FormDictBatchType':
      return {
        query: upsertDictBatchType,
        simple: 1
      };
    case 'FormDictCategories':
      return {
        query: upsertDictCategory,
        simple: 1
      };
    case 'FormDictGrapeType':
      return {
        query: upsertDictGrapeType,
        simple: 1
      };
    case 'FormDictProcesses':
      return {
        query: upsertDictProcess,
        simple: 1
      };
    case 'FormDictVineyardOperations':
      return {
        query: upsertDictVineyardOperation,
        simple: 1
      };
    case 'FormDictWineCategory':
      return {
        query: upsertDictWineCategory,
        simple: 1
      };
    case 'FormGrapeHarvest':
      return {
        query: upsertGrapeHarvest,
        simple: 1
      };
    case 'FormItemInStock':
      return {
        query: upsertItemInStock
        // simple: 0: 0
      };
    case 'FormOperations':
      return {
        query: upsertOperations
        // simple: 0
      };
    case 'FormVineyard':
      return {
        query: upsertVineyard,
        simple: 1
      };
    case 'FormVineyardOperation':
      return {
        query: upsertVineyardOperation,
        simple: 1
      };
    case 'FormWarehouse':
      return {
        query: upsertWarehouse,
        simple: 0,
        fkQuery: warehouseAddress
      };
    case 'FormWaybill':
      return {
        query: upsertWaybill
        // simple: 0
      };
    case 'FormWineInformation':
      return {
        query: upsertWineInformation,
        simple: 0,
        fkQuery: wineInformationBatch
      };
  }
};
