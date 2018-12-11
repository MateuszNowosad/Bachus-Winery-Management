import gql from 'graphql-tag';

const getSpecificProductionPlan = (id) => gql`
  {
    PlanyProdukcyjne(idPlanyProdukcyjne: ${id}) {
  idPlanyProdukcyjne
  nazwa
  opis
  eDokument
}
  }
`;

export default getSpecificProductionPlan;
