import gql from 'graphql-tag';

const getBatches = gql`
  {
    Partie {
      idPartie
      ilosc
      opis
      dataUtworzenia
      typPartii {
        nazwa
      }
    }
  }
`;

export default getBatches;
