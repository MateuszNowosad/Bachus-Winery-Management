import gql from "graphql-tag"

const getAllTables = gql`
    {
        __schema
        {
            queryType
            {
                fields
                {
                    name
                }
            }
        }
    }`;

export default getAllTables;
 