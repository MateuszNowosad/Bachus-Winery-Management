import gql from 'graphql-tag';

const getProductionPlans = gql`
  {
    PlanyProdukcyjne {
      idPlanyProdukcyjne
      nazwa
      opis
      eDokument
    }
  }
`;

export default getProductionPlans;
