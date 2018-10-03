import express, { urlencoded } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
// import schema from "./api/graphql/schema";
// import { repositories } from "./api/graphql/repositories";

import passport from "passport";
import session from "express-session";
import { dbConnector } from "./api/common/MongoRepository";
import prepareGetUserFromPassport from "./prepareGetUserFromPassport";
// import { importSchema } from "graphql-import";


const MongoStore = require("connect-mongo")(session);

export const createApp = async () => {
    const app = express();
    const db = await dbConnector();
    console.log('23, __dirname filip: ', __dirname);


    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser(({ password, ...userDeserialized }, cb) => {
        cb(null, userDeserialized);
    });

    const key = "connect.sid";
    const store = new MongoStore({ db });
    const secret = process.env.SESSION_SECRET || "development secret";
    app.use(
        session({
            key,
            store,
            secret,
            resave: false,
            saveUninitialized: false
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    const getUserFromPassport = prepareGetUserFromPassport({
        key,
        secret,
        store,
        passport
    });

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
