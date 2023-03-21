const express = require('express');
require('dotenv').config();
require('colors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/connection.js');
connectDB();

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, console.log(`Listing on port: ${PORT}...`));

module.exports = app;