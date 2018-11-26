import React, { Fragment } from 'react';
import { FormDictCategories } from './FormDictCategories';
import { FormDictVineyardOperations } from './FormDictVineyardOperations';
import { FormDictProcesses } from './FormDictProcesses';
import { FormDictGrapeType } from './FormDictGrapeType';
import { FormDictWineCategory } from './FormDictWineCategory';
import { FormDictUserRole } from './FormDictUserRole';
import { FormDictBatchType } from './FormDictBatchType';
import { FormUsers } from './FormUsers';
import { FormVineyard } from './FormVineyard';
import { FormWarehouse } from './FormWarehouse';
import { FormContractors } from './FormContractors';
import { FormVineyardOperation } from './FormVineyardOperation';
import { FormGrapeHarvest } from './FormGrapeHarvest';
import { dictWineCategories, vineyardOperations, vineyards } from './StaticData';
import { FormWineInformation } from './FormWineInformation';
import { FormBatches } from './FormBatches';
import { FormWaybill } from './FormWaybill';

export class Forms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addresse: [],
      contractors: [],
      dictCategories: [],
      dictGrapeTypes: [],
      dictProcesses: [],
      dictBatchTypes: [],
      dictUserRoles: [],
      dictVineyardOperations: vineyardOperations,
      dictWineCategories: dictWineCategories,
      users: [],
      vineyards: vineyards,
      warehouses: [],
      vineyardOperations: []
    };
  }

  handleDictCateogriesSubmit = dictCategory => {
    this.setState(({ dictCategories }) => ({
      dictCategories: [...dictCategories, dictCategory]
    }));
  };

  handleDictVineyardOperationsSubmit = dictVineyardOperation => {
    this.setState(({ dictVineyardOperations }) => ({
      dictVineyardOperations: [...dictVineyardOperations, dictVineyardOperation]
    }));
  };

  handleDictProcessesSubmit = dictProcess => {
    this.setState(({ dictProcesses }) => ({
      dictProcesses: [...dictProcesses, dictProcess]
    }));
  };

  handleDictGrapeTypeSubmit = dictGrapeType => {
    this.setState(({ dictGrapeTypes }) => ({
      dictGrapeTypes: [...dictGrapeTypes, dictGrapeType]
    }));
  };

  handleDictWineCateogrySubmit = dictWineCategory => {
    this.setState(({ dictWineCategories }) => ({
      dictWineCategories: [...dictWineCategories, dictWineCategory]
    }));
  };

  handleDictUserRoleSubmit = dictUserRole => {
    this.setState(({ dictUserRoles }) => ({
      dictUserRoles: [...dictUserRoles, dictUserRole]
    }));
  };

  handleDictBatchTypeSubmit = dictBatchType => {
    this.setState(({ dictBatchTypes }) => ({
      dictBatchTypes: [...dictBatchTypes, dictBatchType]
    }));
  };

  handleUsersSubmit = user => {
    this.setState(({ users }) => ({
      users: [...users, user]
    }));
  };

  handleVineyardSubmit = vineyard => {
    this.setState(({ vineyards }) => ({
      vineyards: [...vineyards, vineyard]
    }));
  };

  handleWarehouseSubmit = warehouse => {
    this.setState(({ warehouses }) => ({
      warehouses: [...warehouses, warehouse]
    }));
  };

  handleContractorsSubmit = contractor => {
    this.setState(({ contractors }) => ({
      contractors: [...contractors, contractor]
    }));
  };

  handleVineyardOpertaionSubmit = vineyardOperation => {
    this.setState(({ vineyardOperations }) => ({
      vineyardOperations: [...vineyardOperations, vineyardOperation]
    }));
  };

  render() {
    return (
      <Fragment>
        <FormDictCategories onSubmit={this.handleDictCateogriesSubmit} />
        <FormDictVineyardOperations onSubmit={this.handleDictVineyardOperationsSubmit} />
        <FormDictProcesses onSubmit={this.handleDictProcessesSubmit} />
        <FormDictGrapeType onSubmit={this.handleDictGrapeTypeSubmit} />
        <FormDictWineCategory onSubmit={this.handleDictWineCateogrySubmit} />
        <FormDictUserRole onSubmit={this.handleDictUserRoleSubmit} />
        <FormDictBatchType onSubmit={this.handleDictBatchTypeSubmit} />
        <FormUsers onSubmit={this.handleUsersSubmit} />
        <FormVineyard onSubmit={this.handleVineyardSubmit} />
        <FormWarehouse onSubmit={this.handleWarehouseSubmit} />
        <FormContractors onSubmit={this.handleContractorsSubmit} />
        <FormVineyardOperation
          onSubmit={this.handleVineyardOpertaionSubmit}
          dictOperations={this.state.dictVineyardOperations}
          vineyards={vineyards}
        />
        <FormGrapeHarvest />
        <FormWineInformation />
        <FormBatches />
        <FormWaybill />
      </Fragment>
    );
  }
}
