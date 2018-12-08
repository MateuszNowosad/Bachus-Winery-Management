import gql from 'graphql-tag';

const getDictBatchType = gql`
  {
    DictTypPartii {
      idTypPartii
      nazwa
      jednostka
    }
  }
`;

export default getDictBatchType;
