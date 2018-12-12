import gql from 'graphql-tag';

const getWarehouseForList = gql`
  {
    Magazyn {
      idMagazyn
      adres {
        miasto
        ulica
        nrPosesji
      }
      rodzaj
    }
  }
`;

export default getWarehouseForList;
