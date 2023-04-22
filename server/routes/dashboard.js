// Express.js
const router = require('express').Router();

// Mongoose
const mongoose = require('mongoose');

// other imports
const ReviewSchema = require('../models/Review');
const BlogSchema = require('../models/Blog');
const Review = mongoose.model('Review', ReviewSchema);
const Blog = mongoose.model('Blog', BlogSchema);

router.get('/reviews/:userId', async (req, res) => {
    let reviews = await Review.find({ user: req.params.userId });
    res.send(reviews);
});

router.get('/blogs/:userId', async (req, res) => {
    let blogs = await Blog.find({ user: req.params.userId });
    res.send(blogs);
});

module.exports = router;