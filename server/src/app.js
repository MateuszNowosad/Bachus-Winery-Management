import express, { urlencoded } from 'express';
import session from 'express-session';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import path from 'path';
import * as sequelize from './sequelizeDB';
import bcrypt from 'bcrypt';

//TODO Don't forget to change this file when refractoring routes.
const SESSION_SECRET = 'SECRET'; //TODO place this in .env before production
const webPath = path.resolve('../../web/');

export const createApp = async () => {
  const app = express();
  console.log('23, __dirname filip: ', __dirname);

  const corsOptions = {
    origin: 'http://192.168.0.12:3000', //Change on host should be env variable.
    credentials: true
  };

  app.use(cors(corsOptions));
  app.use(urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(
    session({
      name: 'loginID',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  app.use((req, res, next) => {
    console.log('req.session', req.session);
    next();
  });

  const salt = await bcrypt;

  app.post('/usrauthorization', async (req, res) => {
    console.log('user signup');
    console.log(req.body);
    const user = await sequelize.getUzytkownicy({ login: req.body.login });
    console.log('60, user Mateusz: ', user);
    if (!user.length) {
      res.end();
    }
    if (user[0].czyAktywne !== 1) {
      res.end();
    }
    req.session.login = req.body.login;
    req.session.idUzytkownika = user[0].idUzytkownika;
    req.session.role = user[0].dictRolaUzytkownikowIdRolaUzytkownikow;
    res.send({ status: 'Success', cookie: req.session.cookie });
    res.end();
  });

  app.get('/usrrole', (req, res) => {
    console.log('user rolelookup');
    console.log(req.body);
    res.send({ idUzytkownika: req.session.idUzytkownika, role: req.session.role });
    res.end();
  });

  app.post('/usrlogout', async (req, res) => {
    console.log('user logout');
    console.log(req.body);
    req.session.destroy();
    res.clearCookie('loginID');
    res.send({succes: true});
    res.end();
  });
  return { app };
};

module.exports = {
  createApp
};
