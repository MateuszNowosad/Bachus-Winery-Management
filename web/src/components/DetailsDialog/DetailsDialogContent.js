import React from 'react'
import {
  getBatchForForm,
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
  getVineyardForForm,
  getVineyardOperationForForm,
  getWarehouseForForm,
  getWaybillForForm,
  getWineInformationForForm
} from '../../queries/FormQueries/formQueries';
import UserDetailsContent from './DetailsDialogContent/UserDetailsContent';
import ContractorDetailsContent from './DetailsDialogContent/ContractorDetailsContent';
import VineyardDetailsContent from './DetailsDialogContent/VineyardDetailsContent';

class DetailsDialogContent extends  React.Component{
  constructor(props) {
    super(props);

  }

  selectDetails = (dataType,queryData) => {
    switch (dataType) {
      case 'FormUsers':
        return <UserDetailsContent queryData={queryData}/>;
      case 'FormBatches':
        return getBatchForForm;
      case 'FormContractors':
        return <ContractorDetailsContent queryData={queryData}/>;
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
        return <VineyardDetailsContent queryData={queryData}/>;
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

  render() {
    const {queryData,dataType}= this.props;
    return (
      this.selectDetails(dataType,queryData)
    );
  }
}

export default DetailsDialogContent