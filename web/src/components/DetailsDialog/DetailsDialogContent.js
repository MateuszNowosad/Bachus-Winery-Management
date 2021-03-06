import React from 'react';
import UserDetailsContent from './DetailsDialogContent/UserDetailsContent';
import ContractorDetailsContent from './DetailsDialogContent/ContractorDetailsContent';
import VineyardDetailsContent from './DetailsDialogContent/VineyardDetailsContent';
import GrapeHarvestDetailsContent from './DetailsDialogContent/GrapeHarvestDetails';
import BatchDetailsContent from './DetailsDialogContent/BatchDetailsContent';
import WaybillDetailsContent from './DetailsDialogContent/WaybillDetailsContent';
import WarehouseDetailsContent from './DetailsDialogContent/WarehouseDetailsContent';

class DetailsDialogContent extends React.Component {
  constructor(props) {
    super(props);
  }

  selectDetails = (dataType, queryData) => {
    switch (dataType) {
      case 'FormUsers':
        return <UserDetailsContent queryData={queryData} />;
      case 'FormBatches':
        return <BatchDetailsContent queryData={queryData} />;
      case 'FormContractors':
        return <ContractorDetailsContent queryData={queryData} />;
      case 'FormGrapeHarvest':
        return <GrapeHarvestDetailsContent queryData={queryData} />;
      case 'FormVineyard':
        return <VineyardDetailsContent queryData={queryData} />;
      case 'FormWarehouse':
        return <WarehouseDetailsContent queryData={queryData} />;
      case 'FormWaybill':
        return <WaybillDetailsContent queryData={queryData} />;
    }
  };

  render() {
    const { queryData, dataType } = this.props;
    return this.selectDetails(dataType, queryData);
  }
}

export default DetailsDialogContent;
