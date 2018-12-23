import {
  getBatchDetails,
  getContractorDetails,
  getGrapeHarvestDetails,
  getItemInStockDetails,
  getOperationDetails,
  getUserDetails,
  getVineyardDetails,
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
    case 'FormGrapeHarvest':
      return getGrapeHarvestDetails;
    case 'FormItemInStock':
      return getItemInStockDetails;
    case 'FormOperations':
      return getOperationDetails;
    case 'FormVineyard':
      return getVineyardDetails;
    case 'FormWarehouse':
      return getWarehouseDetails;
    case 'FormWaybill':
      return getWaybillDetails;
    case 'FormWineInformation':
      return getWineInformationDetails;
  }
};
