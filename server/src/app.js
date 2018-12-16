import express, { urlencoded } from 'express';
import session from 'express-session';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import path from 'path';

//TODO Don't forget to change this file when refractoring routes.
const SESSION_SECRET = 'SECRET'; //TODO place this in .env before production
const webPath = path.resolve('../../web/');

export const createApp = async () => {
  const app = express();
  console.log('23, __dirname filip: ', __dirname);
  //
  // const corsOptions = {
  //   origin(origin, callback) {
  //     callback(null, true);
  //   },
  //   credentials: true
  // };

  app.use(
    session({
      name: "loginID",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
  };

  app.use(cors(corsOptions));
  app.use(urlencoded({ extended: true }));
  app.use(bodyParser.json());

//   app.use(session({ key: 'testCookie', secret: 'cat', cookie: { maxAge: 3*100*100 } }));
//
//   const sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//       res.redirect('/admindashboard');
//     } else {
//       next();
//     }
//   };
//
//   app.get('/', sessionChecker, (req, res) => {
//     res.redirect('/');
//   });
//
//   // app.get('/session', function(req, res, next) {
//   //   if (req.session.views) {
//   //     req.session.views++;
//   //     res.setHeader('Content-Type', 'text/html');
//   //     res.write('<p>views: ' + req.session.views + '</p>');
//   //     res.write('<p>expires in: ' + req.session.cookie.maxAge / 1000 + 's</p>');
//   //     res.end();
//   //   } else {
//   //     req.session.views = 1;
//   //     res.end('welcome to the session demo. refresh!');
//   //   }
//   // });
//
//   app.route('/')
//     .get(sessionChecker, (req, res) => {
//       res.sendFile(__dirname + '/public/login.html');
//     })
//     .post((req, res) => {
//       var username = req.body.username,
//         password = req.body.password;
//
//       User.findOne({ where: { username: username } }).then(function (user) {
//         if (!user) {
//           res.redirect('/login');
//         } else if (!user.validPassword(password)) {
//           res.redirect('/login');
//         } else {
//           req.session.user = user.dataValues;
//           res.redirect('/dashboard');
//         }
//       });
//     });
//
//   app.get('/admindashboard', (req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//       res.sendFile(__dirname + '/public/dashboard.html');
//     } else {
//       res.redirect('/login');
//     }
//   });
//
   return { app };
};

module.exports = {
  createApp
};
