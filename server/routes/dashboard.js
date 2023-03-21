const router = require('express').Router();
const mongoose = require('mongoose');
const requireAuth = require('../auth/auth');
const ReviewSchema = require('../models/Review');
const BlogSchema = require('../models/Blog');
const Review = mongoose.model('Review', ReviewSchema);
const Blog = mongoose.model('Blog', BlogSchema);

router.get('/reviews', async (req, res) => {
    try {
        const { user }  = req.session;
        console.log(req.session);
        const userReviews = await Review.find({
            user: user._id
        });
        res.send(userReviews);
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
});

router.get('/blogs', async (req, res) => {
    try {
        const { user }  = req.session;
        console.log(req.session);
        const userBlogs = await Blog.find({
            user: user._id
        });
        res.send(userBlogs);
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
});

module.exports = router;