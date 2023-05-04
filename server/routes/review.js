// Express.js 
const router = require('express').Router();

// Mongoose
const mongoose = require('mongoose');

// other imports
const ReviewSchema = require('../models/Review');
const Review = mongoose.model('Review', ReviewSchema);
const User = require('../models/User');
const Zoo = require('../models/Zoo');

router.get('/', async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});

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

router.get('/:userId', async (req, res) => {
    let reviews = await Review.find({ user: req.params.userId });
    res.send(reviews);
});

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

router.delete('/:userId/:reviewId', async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    
    if(user.admin === false) {
        return res.status(400).json({ msg: 'Unauthorized request!' });
    }

    const review = await Review.findOne({ _id: req.params.reviewId });

    await User.findOneAndUpdate({ _id: review.user.toString() }, { $pull: {reviews: {_id: req.params.reviewId }} }).exec();
    await Zoo.findOneAndUpdate({ _id: review.zoo.toString() }, { $pull: {reviews: {_id: req.params.reviewId }} }).exec();
    await Review.findOneAndDelete({ _id: req.params.reviewId });
    
    res.status(204).send();
});

module.exports = router;