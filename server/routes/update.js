// Express.js
const express = require('express');
const router = express.Router();

// other Node.js packages
const bcrypt = require('bcrypt');

// util
const validateEmail = require('../util/validateEmail');

// other imports
const User = require('../models/User');

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

    if(req.body.oldPassword !== '' && req.body.newPassword !== '') {
        const validate = await bcrypt.compare(req.body.oldPassword, user.password);
        if(!validate) {
            return res.status(400).json({ msg: 'Old password is wrong!' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.newPassword, salt);
        user.password = hashedPass;
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