const express = require('express');
require('dotenv').config();
require('colors');
const cors = require('cors');
const session = require('express-session');
const MongoDBstore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/connection.js');
connectDB();

const mongoDBstore = new MongoDBstore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const maxAge = 1000 * 60 * 60 * 8; 

app.use(
    session({
      name: 'express-cookie', 
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false,
      store: mongoDBstore,
      cookie: {
        maxAge: maxAge,
        sameSite: false,
        secure: true
      }
    })
  );

app.use(routes);

app.listen(PORT, console.log(`Listing on port: ${PORT}...`));

module.exports = app;