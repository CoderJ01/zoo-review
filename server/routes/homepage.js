// Express.js
const router = require('express').Router();

// Mongoose
const mongoose = require('mongoose');

// other imports
const ReviewSchema = require('../models/Review');
const BlogSchema = require('../models/Blog');
const Review = mongoose.model('Review', ReviewSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const User = require('../models/User');
const Zoo = require('../models/Zoo');

router.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});

router.get('/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});

router.delete('/review/:userId/:reviewId', async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    
    if(user.admin === false) {
        return res.status(400).json({ msg: 'Unauthorized request!' });
    }

    const review = await Review.findOne({ _id: req.params.reviewId });

    await User.findOneAndUpdate({ _id: review.user.toString() }, { $pull: {reviews: {_id: req.params.reviewId }} }).exec();
    await Zoo.findOneAndUpdate({ _id: review.zoo.toString() }, { $pull: {reviews: {_id: req.params.reviewId }} }).exec();
    await Review.findOneAndDelete({ _id: req.params.reviewId });
    
    res.status(204).send();
});

router.delete('/blog/:userId/:blogId', async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    
    if(user.admin === false) {
        return res.status(400).json({ msg: 'Unauthorized request!' });
    }

    const blog = await Blog.findOne({ _id: req.params.blogId });

    await User.findOneAndUpdate({ _id: blog.user.toString() }, { $pull: {blogs: {_id: req.params.blogId }} }).exec();
    await Blog.findOneAndDelete({ _id: req.params.blogId });
    
    res.status(204).send();
});


module.exports = router;