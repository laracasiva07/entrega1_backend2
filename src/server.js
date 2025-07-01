import express from 'express';
import config from './config/index.js';
import sessionRouter from './routes/session.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import hbs from 'express-handlebars';
import mongoose from "mongoose";
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const {PORT, MONGO_URI, SECRET} = config;
const server = express();

server.engine("handlebars", hbs.engine());
server.set("views", import.meta.dirname + "/views");
server.set("views engine", "handlebars")

server.use(express.json)
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


server.listen(PORT, () => console.log(`listening on port ${PORT}`))
mongoose.connect(MONGO_URI, {dbName: "entrega2"})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => {
    console.error({error: err.menssage})
    process.exit(1)
})