const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('colors');
const userRoutes = require('../server/routes/user');

const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/connection.js');

app.use(express.json());
app.use(cors());

connectDB();

app.use(userRoutes)

app.listen(PORT, console.log(`Listing on port: ${PORT}...`))