const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', (req, res) => {
    const newUser =  new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        avatar: req.body.avatar
    });
    newUser.save();
    res.send(newUser);
});

module.exports = router;