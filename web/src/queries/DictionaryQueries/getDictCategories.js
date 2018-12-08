import gql from 'graphql-tag';

const getDictCategories = gql`
  {
    DictKategorie {
      idKategorie
      nazwa
      jednostka
      opis
    }
  }
`;

export default getDictCategories;
