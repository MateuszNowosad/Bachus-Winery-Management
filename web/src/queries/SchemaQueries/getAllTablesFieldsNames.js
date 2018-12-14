import gql from 'graphql-tag';

const getAllTablesFieldNames = gql`
  {
    __schema {
      tables: types {
        name
        fields {
          name
          type {
            kind
            ofType {
              fields {
                name
                type {
                  kind
                  fields {
                    name
                  }
                }
              }
            }
            fields {
              name
              type {
                kind
                fields {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default getAllTablesFieldNames;
