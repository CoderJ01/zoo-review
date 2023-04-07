const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.put('/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    const email = await User.findOne({ email: req.body.email });

    if(email) {
        return res.status(400).json({ msg: 'Email must be unique!' });
    }
    
    if(req.body.email !== '') {
        user.email = req.body.email;
    }

    if(req.body.avatar !== '') {
        user.avatar = req.body.avatar;
    }

    user.save();

    res.send({
        email: user.email,
        avatar: user.avatar,
        msg: 'Infomation has been updated!'
    });
});

module.exports = router;