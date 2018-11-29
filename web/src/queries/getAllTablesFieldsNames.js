import gql from "graphql-tag"

const getAllTablesFieldNames = gql`
{
 __schema {
  queryType {
    fields {
      name
      args {
        name
      }
    }
  }
}
}`;

export default getAllTablesFieldNames;