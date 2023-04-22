// Express.js
const express = require('express');

// dotenv
require('dotenv').config();

// other Node.js packages
const cors = require('cors');
require('colors');

// others imports
const connectDB = require('./config/connection.js');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000', process.env.DEPLOYED_FRONTEND],
    methods:['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(routes);

app.listen(PORT, console.log(`Listing on port: ${PORT}...`));

module.exports = app;