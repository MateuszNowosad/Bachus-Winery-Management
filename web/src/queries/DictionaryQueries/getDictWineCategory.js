import gql from 'graphql-tag';

const getDictWineCategory = gql`
  {
    DictKategoriaWina {
      idDictKategoriaWina
      nazwaKategoria
      opis
    }
  }
`;

export default getDictWineCategory;
