import https from 'https';
import { createApp } from './app';
import { importSchema } from 'graphql-import';
import resolvers from './api/graphql/resolvers';
import { corsConfig, corsWhitelist } from 'cors';
const fs = require('fs');

let privateKey = fs.readFileSync('./src/sslcert/server.key', 'utf8');
let certificate = fs.readFileSync('./src/sslcert/server.crt', 'utf8');

const { ApolloServer } = require('apollo-server-express');
let credentials = { key: privateKey, cert: certificate };

const serverListen = async function serverListen() {
  const { app } = await createApp();
  const typeDefs = importSchema(`${__dirname}/api/graphql/schema.graphql`);
  const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req: req }), playground: true }); //TODO here you can do ({session: req.session}), given you update this in resolvers. I will do it tomorrow.
  server.applyMiddleware({ app });
  const port = process.env.PORT || 8080;

  let httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port, undefined, undefined, () =>
    // eslint-disable-next-line no-console
    console.log(`API Server is now running on http://localhost:${port}/graphql`)
  );
};

serverListen();
