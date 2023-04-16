const express = require('express');
const router = express.Router();
const User = require('../models/User');
const validateEmail = require('../util/validateEmail');

router.put('/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    const email = await User.findOne({ email: req.body.email });
    let message = 'Infomation has been updated!';

    if(email) {
        return res.status(400).json({ msg: 'Email must be unique!' });
    }
    
    if(req.body.email !== '') {
        user.email = req.body.email;
        user.verified = false;
        validateEmail(user.email, 'updateEmail');
        message = `A verification link will be sent to ${user.email}. Wait 5 - 10 minutes for the link.`;
    }

    if(req.body.bio !== '') {
        user.bio = req.body.bio;
    }

    if(req.body.avatar !== '') {
        user.avatar = req.body.avatar;
    }

    user.save();

    res.send({
        email: user.email,
        avatar: user.avatar,
        msg: message
    });
});

module.exports = router;