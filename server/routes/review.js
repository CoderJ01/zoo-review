const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../models/Review');
const Review = mongoose.model('Review', ReviewSchema);
const User = require('../models/User');

router.post('/:userId', async (req, res) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        image: req.body.image,
        user: req.params.userId
    });
    review.save();
    console.log(review);

    const user = await User.findOneAndUpdate({ _id: req.params.userId},
        { $push: { 'reviews': review } },
        { new: true }
    );
    console.log(user);
});

router.get('/', async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});

router.get('/:id', async (req, res) => {
    const review = await Review.findById({ _id: req.params.id });
    res.send(review);
})

router.patch('/:id', async (req, res) => {
   
});

router.delete('/:userId/:reviewId', async (req, res) => {
    const { userId, reviewId } = req.params;
    User.findOneAndUpdate({ _id: userId }, { $pull: {reviews: { _id: reviewId}}}, function(err, data) {
        console.log(err, data);
    });
});

module.exports = router;