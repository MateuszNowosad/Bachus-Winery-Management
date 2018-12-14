import gql from 'graphql-tag';

const getDictGrapeType = gql`
  {
    DictOdmianaWinogron {
      idOdmianaWinogron
      nazwa
      opis
    }
  }
`;

export default getDictGrapeType;
