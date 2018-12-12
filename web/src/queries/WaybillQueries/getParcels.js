import gql from 'graphql-tag';

const getParcels = gql`
  {
    Przesylka {
      idPrzesylka
      nazwaPrzesylki
      ciezarLadunku
      data
      listPrzewozowy {
        idListPrzewozowy
      }
    }
  }
`;

export default getParcels;
