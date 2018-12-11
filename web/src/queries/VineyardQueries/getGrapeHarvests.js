import gql from 'graphql-tag';

const getGrapeHarvests = gql`
  {
    Winobranie {
    idWinobranie
    dataWinobrania
    iloscZebranychWinogron
    winnica {
      nazwa
    }
  }
  }
`;

export default getGrapeHarvests;
