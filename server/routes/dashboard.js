const router = require('express').Router();
const mongoose = require('mongoose');
const requireAuth = require('../auth/auth');
const ReviewSchema = require('../models/Review');
const BlogSchema = require('../models/Blog');
const Review = mongoose.model('Review', ReviewSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const retrieveSession = require('../MongoDB/data');

router.get('/reviews/:userId', async (req, res) => {
    try {
        let user = retrieveSession(req.params.userId);
        console.log(user);
        if(user) {
            let review = await Review.find({ user: req.params.userId });
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

router.get('/blogs', async (req, res) => {
    
});

module.exports = router;