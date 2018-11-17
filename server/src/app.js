import express, { urlencoded } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';

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

  return { app };
};

module.exports = {
  createApp
};
