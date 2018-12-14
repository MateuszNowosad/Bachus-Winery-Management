import gql from 'graphql-tag';

const simpleQueryBuilder = (table, fields) => {
  let query = '{' + table + '{';
  fields.map(field => {
    if (field instanceof Object) {
      query += Object.keys(field)[0] + '{ ';
      let objectFields = Object.values(field)[0];
      objectFields.map(objectField => {
        query += objectField + ' ';
      });
      query += '}';
    } else query += field + ' ';
  });
  query += '}}';
  return gql(query);
};

export default simpleQueryBuilder;
