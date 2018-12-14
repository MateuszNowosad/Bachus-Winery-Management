import gql from 'graphql-tag';

const getDictVineyardOperations = gql`
  {
    DictOperacjeNaWinnicy {
      idDictOperacjeNaWinnicy
      nazwa
      opis
    }
  }
`;

export default getDictVineyardOperations;
