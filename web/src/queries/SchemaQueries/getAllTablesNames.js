import gql from 'graphql-tag';

const getAllTablesNames = gql`
  {
    __schema {
      queryType {
        tables: fields {
          name
        }
      }
    }
  }
`;

export default getAllTablesNames;
