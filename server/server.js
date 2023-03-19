const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
require('dotenv').config();
require('colors');
const routes = require('../server/routes/index');

const MAX_AGE = 1000 * 60 * 60 * 3;

const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySession'
});

const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/connection.js');

app.use(express.json());
app.use(cors());

connectDB();

app.use(routes);

app.listen(PORT, console.log(`Listing on port: ${PORT}...`))