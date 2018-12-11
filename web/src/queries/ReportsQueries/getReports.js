import gql from 'graphql-tag';

const getReports = gql`
  {
    Raporty {
    idRaport
    nazwa
    dataUtworzenia
  }
  }
`;

export default getReports;
