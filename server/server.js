const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('colors');
const routes = require('../server/routes/index');

const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/connection.js');

app.use(express.json());
app.use(cors());

connectDB();

app.use(routes);

app.listen(PORT, console.log(`Listing on port: ${PORT}...`))