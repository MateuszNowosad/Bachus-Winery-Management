import gql from 'graphql-tag';

const getOperations = gql`
  {
    Operacje {
      idOperacja
      iloscPrzed
      iloscPo
      dataPoczatku
      dataZakonczenia
      zawartoscAlkoholu
      iloscDodatku
      zawartoscCukru
      kwasowosc
      temperatura
      opis
      dictProcesy {
        nazwa
      }
    }
  }
`;

export default getOperations;
