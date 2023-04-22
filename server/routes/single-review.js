// Express.js
const router = require('express').Router();

// Mongoose
const mongoose = require('mongoose');

// other imports
const ReviewSchema = require('../models/Review');
const Review = mongoose.model('Review', ReviewSchema);
const User = require('../models/User');
const Zoo = require('../models/Zoo');

router.get('/:id', async (req, res) => {
    const review = await Review.findOne({ _id: req.params.id });
    if(!review) {
        res.send('Review does not exist!');
        return;
    }

    const user = await User.findOne({ _id: review.user.toString() });
    const zoo = await Zoo.findOne({ _id: review.zoo.toString() });
    
    res.send({
        data: review,
        user: user.username,
        avatar: user.avatar,
        admin: user.admin,
        bio: user.bio,
        zoo: zoo.name
    });
});

module.exports = router;