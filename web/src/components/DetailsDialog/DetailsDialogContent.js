import React from 'react'
import {
  getBatchForForm,
  getItemInStockForForm,
  getOperationForForm,
  getWarehouseForForm,
  getWaybillForForm,
  getWineInformationForForm
} from '../../queries/FormQueries/formQueries';
import UserDetailsContent from './DetailsDialogContent/UserDetailsContent';
import ContractorDetailsContent from './DetailsDialogContent/ContractorDetailsContent';
import VineyardDetailsContent from './DetailsDialogContent/VineyardDetailsContent';
import GrapeHarvestDetailsContent from './DetailsDialogContent/GrapeHarvestDetails';
import BatchDetailsContent from './DetailsDialogContent/BatchDetailsContent';
import WaybillDetailsContent from './DetailsDialogContent/WaybillDetailsContent';

class DetailsDialogContent extends  React.Component{
  constructor(props) {
    super(props);

  }

  selectDetails = (dataType,queryData) => {
    switch (dataType) {
      case 'FormUsers':
        return <UserDetailsContent queryData={queryData}/>;
      case 'FormBatches':
        return <BatchDetailsContent queryData={queryData}/>;
      case 'FormContractors':
        return <ContractorDetailsContent queryData={queryData}/>;
      case 'FormGrapeHarvest':
        return <GrapeHarvestDetailsContent queryData={queryData}/>;
      case 'FormItemInStock':
        return getItemInStockForForm;
      case 'FormOperations':
        return getOperationForForm;
      case 'FormVineyard':
        return <VineyardDetailsContent queryData={queryData}/>;
      case 'FormWarehouse':
        return getWarehouseForForm;
      case 'FormWaybill':
        return <WaybillDetailsContent queryData={queryData}/>;
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