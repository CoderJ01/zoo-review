// Express.js 
const router = require('express').Router();

// Mongoose
const mongoose = require('mongoose');

// other imports
const BlogSchema = require('../models/Blog');
const Blog = mongoose.model('Blog', BlogSchema);
const User = require('../models/User');

router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    if(!blog) {
        res.send('Blog does not exist!');
        return;
    }

    const user = await User.findOne({ _id: blog.user.toString() });

    res.send({
        data: blog,
        user: user.username,
        email: user.email,
        admin: user.admin
    });
});

router.get('/:userId', async (req, res) => {
    let blogs = await Blog.find({ user: req.params.userId });
    res.send(blogs);
});

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

router.put('/like/:userId/:blogId', async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    const blog = await Blog.findOne({ _id: req.params.blogId });
    
    if(!user.likedBlogs.includes(req.params.blogId)) {
        user.likedBlogs.push(req.params.blogId);
        blog.thumbs++;
        if(user.dislikedBlogs.includes(req.params.blogId)) {
            user.dislikedBlogs.pull(req.params.blogId);
            blog.thumbs++;
        }
    }
    else {
        user.likedBlogs.pull(req.params.blogId);
        blog.thumbs--;
    }

    user.save();
    blog.save();

    res.send({
        liked: user.likedBlogs,
        disliked: user.dislikedBlogs,
        blog: blog.thumbs
    });
});

router.put('/dislike/:userId/:blogId', async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    const blog = await Blog.findOne({ _id: req.params.blogId });
    
    if(!user.dislikedBlogs.includes(req.params.blogId)) {
        user.dislikedBlogs.push(req.params.blogId);
        blog.thumbs--;
        if(user.likedBlogs.includes(req.params.blogId)) {
            user.likedBlogs.pull(req.params.blogId);
            blog.thumbs--;
        }
    }
    else {
        user.dislikedBlogs.pull(req.params.blogId);
        blog.thumbs++;
    }

    user.save();
    blog.save();

    res.send({
        liked: user.likedBlogs,
        disliked: user.dislikedBlogs,
        blog: blog.thumbs
    });
});

router.delete('/:userId/:blogId', async (req, res) => {
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