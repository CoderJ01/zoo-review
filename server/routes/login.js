const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user) {
            res.status(400).json('User does not exist!');
        }

        const validate = await bcrypt.compare(req.body.password, user.password);
        if(!validate) {
            res.status(400).json('Wrong password!');
        }

        if(validate) {
           const userSession = { email: user.email };
           req.session.user = userSession;
           res.status(200).json({ msg: 'You have logged in successfullly'});
        }
    }
    catch(error) {
        res.status(500).json(error)
    }
});

module.exports = router;