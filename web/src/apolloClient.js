import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = new HttpLink({
  uri: 'http://192.168.0.12:8080/graphql', //Change on host should be env variable.
  credentials: 'same-origin'
});

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
