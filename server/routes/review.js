const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../models/Review');
const Review = mongoose.model('Review', ReviewSchema);
const User = require('../models/User');

router.post('/', async (req, res) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        image: req.body.image,
        user: req.body.user
    });
    review.save();
    console.log(review);

    const user = await User.findOneAndUpdate(req.body.user,
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

router.delete('/:id', async (req, res) => {

});

module.exports = router;