const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../../models/Review');
const Review = mongoose.model('Review', ReviewSchema);
const User = require('../../models/User');
const Zoo = require('../../models/Zoo');
const { retrieveSession } = require('../MongoDB/data');

router.post('/:userId/:zooId', async (req, res) => {
    try {
        let user = retrieveSession(req.params.userId);
        if(user) {
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
        }
    }
    catch(err) {
        res.send({
            error: err,
            msg: 'Invalid authentication!'
        });
    }
});

module.exports = router;