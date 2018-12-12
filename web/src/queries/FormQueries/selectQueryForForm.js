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
  getUserForForm
} from './formQueries';

export const selectQueryForForm = (formName, id) => {
  switch (formName) {
    case 'FormUsers':
      return getUserForForm(id);
    case 'FormBatches':
      return getBatchForForm(id);
    case 'FormContractors':
      return getContractorForForm(id);
    case 'FormDictUserRole':
      return getDictUserRoleForForm(id);
    case 'FormDictBatchType':
      return getDictBatchTypeForForm(id);
    case 'FormDictCategories':
      return getDictCategoryForForm(id);
    case 'FormDictGrapeType':
      return getDictGrapeTypeForForm(id);
    case 'FormDictProcesses':
      return getDictProcesForForm(id);
    case 'FormDictVineyardOperations':
      return getDictVineyardOperationForForm(id);
    case 'FormDictWineCategory':
      return getDictWineCategoryForForm(id);
  }
};
