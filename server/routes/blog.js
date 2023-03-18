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
        const user = await User.findOne({ _id: userId });

        if(req.body.content) {
            blog.content = req.body.content;
            for(let i = 0; i < user.blogs.length; i++) {
                if(user.blogs[i]._id.toString() === blogId) {
                    user.blogs[i].content = req.body.content;
                }
            }
        }

        if(req.body.image) {
            blog.image = req.body.image;
            for(let i = 0; i < user.blogs.length; i++) {
                if(user.blogs[i]._id.toString() === blogId) {
                    user.blogs[i].image = req.body.image;
                }
            }
        }

        await blog.save();
        await user.save();

        res.send(blog);
    }
    catch {
        res.status(404);
        res.send({ error: 'Blog does not exist!' });
    }
});

router.delete('/:userId/:blogId', async (req, res) => {
    const { userId, blogId } = req.params;
    await User.findOneAndUpdate({_id: userId}, {$pull: {blogs: {_id: blogId}}}).exec();
    await Blog.findOneAndDelete({ _id: blogId });
    res.status(204).send();
});

module.exports = router;