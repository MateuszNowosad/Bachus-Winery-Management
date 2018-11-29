import gql from "graphql-tag"

const getAllTablesNames = gql`
    {
        __schema
        {
            queryType
            {
                table: fields
                {
                    name
                }
            }
        }
    }`;

export default getAllTablesNames;
