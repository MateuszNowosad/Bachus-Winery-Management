import gql from "graphql-tag"

const simpleQueryBuilder = (table, fields) => {
    let query = '{' + table + '{';
    fields.map(field => query += field + ' ');
    query += '}}';
    return gql(query);
};

export default simpleQueryBuilder;