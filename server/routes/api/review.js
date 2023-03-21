const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../../models/Review');
const Review = mongoose.model('Review', ReviewSchema);
const User = require('../../models/User');
const Zoo = require('../../models/Zoo');

router.post('/:userId/:zooId', async (req, res) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
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

router.patch('/:userId/:reviewId/:zooId', async (req, res) => {
    try {
        const { userId, reviewId, zooId } = req.params;
        const review = await Review.findOne({ _id: reviewId });
        const user = await User.findOne({ _id: userId });
        const zoo = await Zoo.findOne({ _id: zooId });

        if(req.body.content) {
            review.content = req.body.content;
            for(let i = 0; i < user.reviews.length; i++) {
                if(user.reviews[i]._id.toString() === reviewId) {
                    user.reviews[i].content = req.body.content;
                }
            }

            for(let i = 0; i < zoo.reviews.length; i++) {
                if(zoo.reviews[i]._id.toString() === reviewId) {
                    zoo.reviews[i].content = req.body.content;
                }
            }
        }  

        await review.save();
        await user.save();
        await zoo.save();
        
        res.send(review);
    }
    catch {
        res.status(404);
        res.send({ error: 'Review does not exists!'});
    }
});

router.delete('/:userId/:reviewId/:zooId', async (req, res) => {
    const { userId, reviewId, zooId } = req.params;    
    await User.findOneAndUpdate({ _id: userId }, { $pull: {reviews: {_id: reviewId}} }).exec();
    await Zoo.findOneAndUpdate({ _id: zooId }, { $pull: {reviews: {_id: reviewId}} }).exec();
    await Review.findOneAndDelete({ _id: reviewId });
    res.status(204).send();
});

module.exports = router;