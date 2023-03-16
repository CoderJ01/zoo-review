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

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
})

router.get('/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
});

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if(req.body.email) {
            user.email = req.body.email;
        }

        if(req.body.bio) {
            user.bio = req.body.bio;
        }

        if(req.body.avatar) {
            user.avatar = req.body.avatar;
        }
        
        await user.save();
        res.send(user);
    }
    catch {
        res.status(404);
        res.send({ error: 'Post does not exists!'});
    }
});

module.exports = router;