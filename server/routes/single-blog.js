const router = require('express').Router();
const mongoose = require('mongoose');
const BlogSchema = require('../models/Blog');
const Blog = mongoose.model('Blog', BlogSchema);
const User = require('../models/User');

router.get('/:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: blog.user.toString() });

    res.send({
        data: blog,
        user: user.username,
        email: user.email
    });
});

router.put('/like/:userId/:blogId', async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    console.log(user);
    
    if(!user.likedBlogs.includes(req.params.blogId)) {
        user.likedBlogs.push(req.params.blogId);
        if(user.dislikedBlogs.includes(req.params.blogId)) {
            user.dislikedBlogs.pull(req.params.blogId);
        }
    }
    else {
        user.likedBlogs.pull(req.params.blogId);
    }

    user.save();

    res.send({
        liked: user.likedBlogs,
        disliked: user.dislikedBlogs
    });
});

module.exports = router;