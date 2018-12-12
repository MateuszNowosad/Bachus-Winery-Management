import { getBatchForForm, getContractorForForm, getUserForForm } from './formQueries';

export const selectQueryForForm = (formName, id) => {
  switch (formName) {
    case 'FormUsers':
      return getUserForForm(id);
    case 'FormBatches':
      return getBatchForForm(id);
    case 'FormContractors':
      return getContractorForForm(id);
  }
};
