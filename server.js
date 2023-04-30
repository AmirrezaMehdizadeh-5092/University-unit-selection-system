// import package
const express = require("express");
const server = express();
require('dotenv').config();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongodbstore = require("connect-mongodb-session")(session);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const flash = require('connect-flash');
mongoose.connect("mongodb://localhost/University_SelectUnit");
const db = mongoose.connection;
db.once("open", () => {
    console.log("database is connected");
})
const store = new mongodbstore({
    uri: "mongodb://localhost/University_SelectUnit",
    collection: "session"
})

// important variables and rout
const port = 7788;
const index = require("./rout/index")

// config
server.set('view engine', 'ejs');
server.set("views", "./views");
server.use(express.json())
server.use(bodyparser.urlencoded([extended = true]));
server.use(express.static("public"));
server.use(cookieParser('SsecretKeyForcookeiParserr'));
server.use(session({
    secret: 'SsecretKeyForsessionn',
    resave: true,
    saveUninitialized: true,
    store : store
}));
server.use(flash());
server.use(cors())

// rout
server.use("/" , index)

// run server
server.listen(process.env.port ,()=>{
    console.log("server listening on port " + port);
});