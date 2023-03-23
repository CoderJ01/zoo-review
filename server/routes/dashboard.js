const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../models/Review');
const BlogSchema = require('../models/Blog');
const Review = mongoose.model('Review', ReviewSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const { retrieveSession } = require('../MongoDB/data');

router.get('/reviews/:userId', async (req, res) => {
    try {
        let session = await retrieveSession(req.params.userId);
        let authorizedUser = session.session.user.id;
        if(authorizedUser) {
            let reviews = await Review.find({ user: authorizedUser });
            res.send(reviews);
        }
    }
    catch(err) {
        res.send({
            error: err,
            msg: 'Invalid authentication!'
        });
    }
});

router.get('/blogs/:userId', async (req, res) => {
    try {
        let user = retrieveSession(req.params.userId);
        if(user) {
            let blogs = await Blog.find({ user: req.params.userId });
            res.send(blogs);
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