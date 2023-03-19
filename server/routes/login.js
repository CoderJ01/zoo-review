const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

        const { password, ...other } = user._doc;
        res.status(200).json(other);
        res.send(other);
    }
    catch(error) {
        res.status(500).json(error)
    }
});

module.exports = router;