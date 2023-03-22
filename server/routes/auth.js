const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

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
        avatar: req.body.avatar,
    });
    const sessionUser = { id: newUser._id, username: newUser.username };
    req.session.user = sessionUser;
    newUser.save();
    res.send(newUser);
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

    const sessionUser = { id: user._id, username: user.username };
    req.session.user = sessionUser;

    res.status(200).json({ 
        msg: 'You have logged in successfully',
        data: user,
        accessToken: accessToken
    });
});

router.delete('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(400).send('Unable to log out!');
            } 
            else {
                res.send('Logout successful!')
            }
        });
    }
    else {
        res.end();
    }
});

module.exports = router;