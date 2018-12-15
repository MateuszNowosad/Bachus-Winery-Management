import {
  deleteBatch,
  deleteContractors,
  deleteDictBatchType,
  deleteDictCategory,
  deleteDictGrapeType,
  deleteDictProcess,
  deleteDictUserRole,
  deleteDictVineyardOperation,
  deleteDictWineCategory,
  deleteGrapeHarvest,
  deleteItemInStock,
  deleteOperations,
  deleteUser,
  deleteVineyard,
  deleteVineyardOperation,
  deleteWarehouse,
  deleteWaybill,
  deleteWineInformation
} from './deleteMutations';

export const selectDeleteForForm = formName => {
  switch (formName) {
    case 'FormUsers':
      return deleteUser;
    case 'FormBatches':
      return deleteBatch;
    case 'FormContractors':
      return deleteContractors;
    case 'FormDictUserRole':
      return deleteDictUserRole;
    case 'FormDictBatchType':
      return deleteDictBatchType;
    case 'FormDictCategories':
      return deleteDictCategory;
    case 'FormDictGrapeType':
      return deleteDictGrapeType;
    case 'FormDictProcesses':
      return deleteDictProcess;
    case 'FormDictVineyardOperations':
      return deleteDictVineyardOperation;
    case 'FormDictWineCategory':
      return deleteDictWineCategory;
    case 'FormGrapeHarvest':
      return deleteGrapeHarvest;
    case 'FormItemInStock':
      return deleteItemInStock;
    case 'FormOperations':
      return deleteOperations;
    case 'FormVineyard':
      return deleteVineyard;
    case 'FormVineyardOperation':
      return deleteVineyardOperation;
    case 'FormWarehouse':
      return deleteWarehouse;
    case 'FormWaybill':
      return deleteWaybill;
    case 'FormWineInformation':
      return deleteWineInformation;
  }
};
