import gql from 'graphql-tag';

const getAddresses = gql`
  {
    Adres {
      idAdres
      miasto
      kodPocztowy
      ulica
      nrLokalu
      nrPosesji
      kraj
    }
  }
`;

export default getAddresses;
