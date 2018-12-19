import {
  getBatchForForm,
  getContractorForForm,
  getDictBatchTypeForForm,
  getDictCategoryForForm,
  getDictGrapeTypeForForm,
  getDictProcesForForm,
  getDictUserRoleForForm,
  getDictVineyardOperationForForm,
  getDictWineCategoryForForm,
  getGrapeHarvestForForm,
  getItemInStockForForm,
  getOperationForForm,
  getUserForForm,
  getVineyardForForm,
  getVineyardOperationForForm,
  getWarehouseForForm,
  getWaybillForForm,
  getWineInformationForForm
} from './formQueries';

export const selectQueryForForm = formName => {
  switch (formName) {
    case 'FormUsers':
      return getUserForForm;
    case 'FormBatches':
      return getBatchForForm;
    case 'FormContractors':
      return getContractorForForm;
    case 'FormDictUserRole':
      return getDictUserRoleForForm;
    case 'FormDictBatchType':
      return getDictBatchTypeForForm;
    case 'FormDictCategories':
      return getDictCategoryForForm;
    case 'FormDictGrapeType':
      return getDictGrapeTypeForForm;
    case 'FormDictProcesses':
      return getDictProcesForForm;
    case 'FormDictVineyardOperations':
      return getDictVineyardOperationForForm;
    case 'FormDictWineCategory':
      return getDictWineCategoryForForm;
    case 'FormGrapeHarvest':
      return getGrapeHarvestForForm;
    case 'FormItemInStock':
      return getItemInStockForForm;
    case 'FormOperations':
      return getOperationForForm;
    case 'FormVineyard':
      return getVineyardForForm;
    case 'FormVineyardOperation':
      return getVineyardOperationForForm;
    case 'FormWarehouse':
      return getWarehouseForForm;
    case 'FormWaybill':
      return getWaybillForForm;
    case 'FormWineInformation':
      return getWineInformationForForm;
  }
};
