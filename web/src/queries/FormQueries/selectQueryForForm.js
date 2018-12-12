import { getBatchForForm, getUserForForm } from './formQueries';

export const selectQueryForForm = (formName, id) => {
  switch (formName) {
    case 'FormUser':
      return getUserForForm(id);
    case 'FormBatches':
      return getBatchForForm(id);
  }
};
