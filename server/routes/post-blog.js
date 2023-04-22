// Express.js
const router = require('express').Router();

// Mongoose
const mongoose = require('mongoose');

// other imports
const BlogSchema = require('../models/Blog');
const Blog = mongoose.model('Blog', BlogSchema);
const User = require('../models/User');

router.post('/:userId', async (req, res) => {
    
    const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        user: req.params.userId
    });
    blog.save();
    
    res.send({
        data: blog,
        msg: 'Blog has been successfully created!'
    });

    await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $push: { 'blogs': blog }},
        { new: true } 
    );
});

module.exports = router;