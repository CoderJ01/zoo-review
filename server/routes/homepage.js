const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../models/Review');
const BlogSchema = require('../models/Blog');
const Review = mongoose.model('Review', ReviewSchema);
const Blog = mongoose.model('Blog', BlogSchema);

router.get('/', async (req, res) => {
    const reviews = await Review.find();
    const blogs = await Blog.find();
    console.log(reviews);
    console.log(blogs);
});

module.exports = router;