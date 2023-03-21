const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const requireAuth = require('../auth/auth');
const ReviewSchema = require('../models/Review');
const Review = mongoose.model('Review', ReviewSchema);

router.get('/', async (req, res) => {
    try {
        const { user }  = req.session;
        const reviews = await Review.find();
    }
    catch(err) {
        return res.status(400).json({ error: err });
    }
});

module.exports = router;