import gql from "graphql-tag"

const getAllTablesFieldNames = gql`
{
 __schema {
  queryType {
    table: fields {
      name
      field: args {
        name
      }
    }
  }
}
}`;

export default getAllTablesFieldNames;