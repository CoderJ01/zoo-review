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

    await User.findOneAndUpdate({ _id: req.params.userId },
        { $push: { 'reviews': review } },
        { new: true }
    );

    res.send(review);
});

router.get('/', async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});

router.get('/:id', async (req, res) => {
    const review = await Review.findById({ _id: req.params.id });
    res.send(review);
})

router.patch('/:userId/:reviewId', async (req, res) => {
    try {
        const { userId, reviewId } = req.params;
        const review = await Review.findOne({ _id: reviewId });
        const user = await User.findOne({ _id: userId });

        if(req.body.content) {
            review.content = req.body.content;
            for(let i = 0; i < user.reviews.length; i++) {
                if(user.reviews[i]._id.toString() === reviewId) {
                    user.reviews[i].content = req.body.content;
                }
            }
        }  

        await review.save(review);
        await user.save(user);
        
        res.send(review);
    }
    catch {
        res.status(404);
        res.send({ error: 'Review does not exists!'});
    }
});

router.delete('/:userId/:reviewId', async (req, res) => {
    const { userId, reviewId } = req.params;    
    await User.findOneAndUpdate({_id: userId}, {$pull: {reviews: {_id: reviewId}}}).exec();
    await Review.findOneAndDelete({ _id: reviewId });
    res.status(204).send();
});

module.exports = router;