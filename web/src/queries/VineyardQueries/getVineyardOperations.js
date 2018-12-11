import gql from 'graphql-tag';

const getVineyardOperations = gql`
  {
    OperacjeNaWinnicy {
    idOperacja
    data
    opis
    dictOperacjeNaWinnicy {
      nazwa
    }
    winnica {
      nazwa
    }
  }
  }
`;

export default getVineyardOperations;
