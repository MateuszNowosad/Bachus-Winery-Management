import {
  getBatchDetails,
  getContractorDetails,
  getDictBatchTypeDetails,
  getDictCategoryDetails,
  getDictGrapeTypeDetails,
  getDictProcesDetails,
  getDictUserRoleDetails,
  getDictVineyardOperationDetails,
  getDictWineCategoryDetails,
  getGrapeHarvestDetails,
  getItemInStockDetails,
  getOperationDetails,
  getUserDetails,
  getVineyardDetails,
  getVineyardOperationDetails,
  getWarehouseDetails,
  getWaybillDetails,
  getWineInformationDetails
} from './detailsQueries';

export const selectQueryForDetails = formName => {
  switch (formName) {
    case 'FormUsers':
      return getUserDetails;
    case 'FormBatches':
      return getBatchDetails;
    case 'FormContractors':
      return getContractorDetails;
    case 'FormDictUserRole':
      return getDictUserRoleDetails;
    case 'FormDictBatchType':
      return getDictBatchTypeDetails;
    case 'FormDictCategories':
      return getDictCategoryDetails;
    case 'FormDictGrapeType':
      return getDictGrapeTypeDetails;
    case 'FormDictProcesses':
      return getDictProcesDetails;
    case 'FormDictVineyardOperations':
      return getDictVineyardOperationDetails;
    case 'FormDictWineCategory':
      return getDictWineCategoryDetails;
    case 'FormGrapeHarvest':
      return getGrapeHarvestDetails;
    case 'FormItemInStock':
      return getItemInStockDetails;
    case 'FormOperations':
      return getOperationDetails;
    case 'FormVineyard':
      return getVineyardDetails;
    case 'FormVineyardOperation':
      return getVineyardOperationDetails;
    case 'FormWarehouse':
      return getWarehouseDetails;
    case 'FormWaybill':
      return getWaybillDetails;
    case 'FormWineInformation':
      return getWineInformationDetails;
  }
};
