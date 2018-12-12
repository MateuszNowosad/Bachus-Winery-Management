import gql from 'graphql-tag';

const getVineyards = gql`
  {
    Winnica {
      idWinnica
      nazwa
      powierzchnia
      stan
      terroir
      dataOstatniegoZbioru
      dataZasadzenia
      ewidencyjnyIdDzialki
      dictOdmianaWinogron {
        nazwa
      }
    }
  }
`;

export default getVineyards;
