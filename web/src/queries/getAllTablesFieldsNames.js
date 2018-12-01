import gql from "graphql-tag"

const getAllTablesFieldNames = gql`
{
__schema {
  	tables :types {
    	name
      fields {
        name
        type {
          fields {
            name
            type {
                fields {
                    name
                }
            }
          }
        }
      }    
  	}
	}
}`;

export default getAllTablesFieldNames;