const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../models/Review');
const BlogSchema = require('../models/Blog');
const Review = mongoose.model('Review', ReviewSchema);
const Blog = mongoose.model('Blog', BlogSchema);

router.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});

router.get('/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});

module.exports = router;