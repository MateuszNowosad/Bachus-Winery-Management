import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = new HttpLink({
  uri: 'http://localhost:8080/graphql'
});

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
