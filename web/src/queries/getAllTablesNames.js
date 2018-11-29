import gql from "graphql-tag"

const getAllTablesNames = gql`
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

export default getAllTablesNames;
