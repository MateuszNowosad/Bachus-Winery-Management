import gql from "graphql-tag"

const simpleQueryBuilder = (table,field) => {
    const query = '{'+table+'{'+field+'}}';
    return gql(query);
};

export default simpleQueryBuilder;