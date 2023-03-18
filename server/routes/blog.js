const router = require('express').Router();
const mongoose = require('mongoose');
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
    res.send(blog);

    await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $push: { 'blogs': blog }},
        { new: true } 
    );
});

router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById({ _id: req.params.id });
    res.send(blog);
});

router.patch('/:userId/:blogId', async (req, res) => {
    try {
        const { userId, blogId } = req.params;
        const blog = await Blog.findOne({ _id: blogId });

        if(req.body.content) {
            blog.content = req.body.content;
        }

        await blog.save(blog);
        res.send(blog);
    }
    catch {
        res.status(404);
        res.send({ error: 'Blog does not exist!' });
    }
});

module.exports = router;