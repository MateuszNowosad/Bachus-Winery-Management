import gql from 'graphql-tag';

const getWineInformations = gql`
  {
    InformacjeOWinie {
      idInformacjeOWinie
      nazwa
      motto
      zawartoscPotAlergenow
      wartoscEnergetyczna
      kategoriaWina {
        nazwaKategoria
      }
    }
  }
`;

export default getWineInformations;
