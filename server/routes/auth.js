// Express.js
const express = require('express');
const router = express.Router();

// dotenv
require('dotenv').config();

// other Node.js packages
const bcrypt = require('bcrypt');

// models
const User = require('../models/User');

// utils
const makeCookieValue = require('../util/randomString');
const validateEmail = require('../util/validateEmail');

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const username = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });
   
    if(username) {
        return res.status(400).json({ msg: 'Username must be unique!' });
    }

    if(email) {
        return res.status(400).json({ msg: 'Email must be unique!' });
    }

    const newUser =  new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        bio: req.body.bio,
        avatar: '',
        randomString: '',
        verified: false,
        admin: false
    });    
    newUser.save();

    validateEmail(newUser.email, 'newUser');
    
    res.status(200).json({
        msg: 'You have successfully been registered!',
        data: newUser,
        session: req.session
    });
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(!user) {
        return res.status(400).json('User does not exist!');
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if(!validate) {
        return res.status(400).json('Wrong password!');
    }

    if(!user.verified) {
        validateEmail(user.email, 'loginAttempt');
        return res.status(400).json(`User is not verified! A verification link has been sent to ${user.email}! Wait about 5 minutes to receive the link!`);
    }

    const salt = await bcrypt.genSalt(10);
    user.randomString = await bcrypt.hash(makeCookieValue(80), salt);
    user.save();

    res.status(200).json({ 
        msg: 'You have logged in successfully!',
        data: user,
        session: req.session
    });
});

module.exports = router;