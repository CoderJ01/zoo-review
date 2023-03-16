const router = require('express').Router();
const Review = require('../models/Review');

router.post('/', (req, res) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        image: req.body.image,
        user: req.body.user.id
    });
    review.save();
    res.send(review);
});

router.get('/', async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});

router.get('/:id', async (req, res) => {
    const review = await Review.findById({ _id: req.params.id });
    res.send(review);
})

module.exports = router;