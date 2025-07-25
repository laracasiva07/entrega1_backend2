import express from 'express';
import cookieParser from 'cookie-parser';
import config from './config/index.js';
import sessionRouter from './routes/session.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import hbs from 'express-handlebars';
import mongoose from "mongoose";
import router from './routes/recovery.router.js';
import session from 'express-session';
import passport from 'passport';
import { initializePassport } from './config/passport/main.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import purchaseRouter from './routes/purchase.router.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const {PORT, MONGO_URI, SECRET} = config;
const server = express();
server.use(cookieParser());
initializePassport();
server.use(passport.initialize());

server.engine("handlebars", hbs.engine());
server.set("views", import.meta.dirname + "/views");
server.set("view engine", "handlebars")

server.use(express.json())
server.use(express.static(import.meta.dirname + '/public'))
server.use(express.urlencoded ({ extended : true}))
server.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        sameSite : true,
    }
}))


server.use("/", viewsRouter);
server.use("/api/users", usersRouter);
server.use("/api/session", sessionRouter);
server.use("/", router);
server.use("/api/purchase", purchaseRouter);

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
console.log("MONGO_URI:", MONGO_URI);
mongoose.connect(MONGO_URI, {dbName: "entrega2"})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => {
    console.error({error: err.message})
    process.exit(1)
})