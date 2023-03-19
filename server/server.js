const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
require('dotenv').config();
require('colors');
const routes = require('./routes');
const loginRouter = require('./routes/login');

const app = express();
const MAX_AGE = 1000 * 60 * 60 * 3;
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/connection.js');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // for legacy browser
}

mongoose.Promise = global.Promise;
connectDB();

const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySession'
});

app.use(
    session({
        secret: process.env.SECRET,
        name: 'session-id',
        store: mongoDBstore,
        cookie: {
            maxAge: MAX_AGE,
            sameSite: false,
            secure: false
        },
        resave: true,
        saveUninitialized: false
    })
);

app.use(express.json());
app.use(cors());

app.use('/users', loginRouter);
app.use(routes);

app.listen(PORT, console.log(`Listing on port: ${PORT}...`));

module.exports = app;