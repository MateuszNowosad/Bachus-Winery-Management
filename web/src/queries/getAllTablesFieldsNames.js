import gql from "graphql-tag"

const getAllTablesFieldNames = gql`
{
 __schema {
  queryType {
    tables: fields {
      name
      fields: args {
        name
      }
    }
  }
}
}`;

export default getAllTablesFieldNames;