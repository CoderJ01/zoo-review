const router = require('express').Router();
const Review = require('../models/Review');

router.post('/', (req, res) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        image: req.body.image,
        user: req.body.user._id
    });
    review.save();
    res.send(review);
});

module.exports = router;