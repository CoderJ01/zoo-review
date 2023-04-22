// Express.js
const express = require('express');
const router = express.Router();

// other imports
const User = require('../../models/User');

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

router.delete('/:id', async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.status(204).send();
    }
    catch {
        res.status(404);
        res.send({ error: 'User does not exist' });
    }
});

module.exports = router;