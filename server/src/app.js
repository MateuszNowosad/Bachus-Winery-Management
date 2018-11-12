import express, { urlencoded } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import schema from './api/graphql/schema';
import { repositories } from './api/graphql/repositories';

import passport from 'passport';
import session from 'express-session';
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');

export const createApp = async () => {
  const app = express();
  console.log('23, __dirname filip: ', __dirname);

  const corsOptions = {
    origin(origin, callback) {
      callback(null, true);
    },
    credentials: true
  };

  app.use(cors(corsOptions));

  app.use(urlencoded({ extended: true }));

  app.use(bodyParser.json());

  // not working
  // app.use(
  //   '/graphql',
  //   graphqlExpress(req => ({
  //     schema,
  //     context: {
  //       ...repositories,
  //       user: req.user,
  //       req
  //     }
  //   }))
  // );
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  );

  return { app };
};

module.exports = {
  createApp
};
