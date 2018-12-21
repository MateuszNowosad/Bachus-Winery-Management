import { createServer } from 'http';
import { createApp } from './app';
import { importSchema } from 'graphql-import';
import resolvers from './api/graphql/resolvers';
import { corsConfig, corsWhitelist } from 'cors';

const { ApolloServer } = require('apollo-server-express');

const serverListen = async function serverListen() {
  const { app } = await createApp();
  const typeDefs = importSchema(`${__dirname}/api/graphql/schema.graphql`);
  const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req: req }), playground: true }); //TODO here you can do ({session: req.session}), given you update this in resolvers. I will do it tomorrow.
  server.applyMiddleware({ app });
  const port = process.env.PORT || 8080;

  app.listen(port, undefined, undefined, () =>
    // eslint-disable-next-line no-console
    console.log(`API Server is now running on http://localhost:${port}/graphql`)
  );
};

serverListen();
