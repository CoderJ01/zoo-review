const router = require('express').Router();
const mongoose = require('mongoose');
const requireAuth = require('../auth/auth');
const ReviewSchema = require('../models/Review');
const BlogSchema = require('../models/Blog');
const Review = mongoose.model('Review', ReviewSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const run = require('../MongoDB/data');

router.get('/reviews', async (req, res) => {
    
});

router.get('/blogs', async (req, res) => {
    
});

module.exports = router;