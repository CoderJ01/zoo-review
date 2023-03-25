const router = require('express').Router();
const mongoose = require('mongoose');
const BlogSchema = require('../models/Blog');
const Blog = mongoose.model('Blog', BlogSchema);
const User = require('../models/User');
const { retrieveSession } = require('../MongoDB/data');

router.post('/:userId', async (req, res) => {
    try {
        let user = retrieveSession(req.params.userId);
        if(user) {
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
        }
    }
    catch(err) {
        res.send({
            error: err,
            msg: 'Invalid authentication!'
        })
    }
});

module.exports = router;