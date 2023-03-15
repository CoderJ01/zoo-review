const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('colors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.listen(PORT, console.log(`Listing on port: ${PORT}...`))