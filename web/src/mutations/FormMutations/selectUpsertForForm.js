import {
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
  upsertWineInformation
} from './upsertMutations';

export const selectUpsertForForm = formName => {
  switch (formName) {
    case 'FormUsers':
    // return upsertUser;
    case 'FormBatches':
      return upsertBatch;
    case 'FormContractors':
    // return upsertContractors;
    case 'FormDictUserRole':
      return upsertDictUserRole;
    case 'FormDictBatchType':
      return upsertDictBatchType;
    case 'FormDictCategories':
      return upsertDictCategory;
    case 'FormDictGrapeType':
      return upsertDictGrapeType;
    case 'FormDictProcesses':
      return upsertDictProcess;
    case 'FormDictVineyardOperations':
      return upsertDictVineyardOperation;
    case 'FormDictWineCategory':
      return upsertDictWineCategory;
    case 'FormGrapeHarvest':
      return upsertGrapeHarvest;
    case 'FormItemInStock':
      return upsertItemInStock;
    case 'FormOperations':
      return upsertOperations;
    case 'FormVineyard':
      return upsertVineyard;
    case 'FormVineyardOperation':
      return upsertVineyardOperation;
    case 'FormWarehouse':
      return upsertWarehouse;
    case 'FormWaybill':
      return upsertWaybill;
    case 'FormWineInformation':
      return upsertWineInformation;
  }
};
