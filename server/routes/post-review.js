// Express.js
const router = require('express').Router();

// Mongoose
const mongoose = require('mongoose');

// other imports
const ReviewSchema = require('../models/Review');
const Review = mongoose.model('Review', ReviewSchema);
const User = require('../models/User');
const Zoo = require('../models/Zoo');

router.post('/:userId/:zooId', async (req, res) => {
    const reviewExist = await Review.findOne({ user: req.params.userId, zoo: req.params.zooId });
    if(reviewExist) {
        return res.status(400).json({ msg: 'You have already created a review for this zoo!' });
    }
    
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        image: req.body.image,
        user: req.params.userId,
        zoo: req.params.zooId
    });
    review.save();

    await User.findOneAndUpdate({ _id: req.params.userId },
        { $push: { 'reviews': review } },
        { new: true }
    );

    await Zoo.findOneAndUpdate({ _id: req.params.zooId },
        { $push: { 'reviews': review } },
        { new: true }
    );

    res.send({
        data: review,
        msg: 'Review has been successfully created!'
    });
});

module.exports = router;
