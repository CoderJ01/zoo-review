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
        user: user.username
    });
});

module.exports = router;