const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../models/Review');
const Review = mongoose.model('Review', ReviewSchema);
const User = require('../models/User');
const Zoo = require('../models/Zoo');

router.get('/:id', async (req, res) => {
    const review = await Review.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: review.user.toString() });
    const zoo = await Zoo.findOne({ _id: review.zoo.toString() });
    
    res.send({
        data: review,
        user: user.username,
        avatar: user.avatar,
        admin: user.admin,
        zoo: zoo.name
    });
});

module.exports = router;