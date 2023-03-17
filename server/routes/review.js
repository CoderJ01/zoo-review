const router = require('express').Router();
const Review = require('../models/Review');
const User = require('../models/User');

router.post('/', async (req, res) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        image: req.body.image,
        user: req.body.user
    });

    review.save();
    res.send(review);
    
    await User.findOneAndUpdate(req.body.user,
        { $push: { 'reviews': review } },
        { new: true }
    );
});

router.get('/', async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews);
});

router.get('/:id', async (req, res) => {
    const review = await Review.findById({ _id: req.params.id });
    res.send(review);
})

router.patch('/:id', async (req, res) => {
    try {
        const review = await Review.findOne({ _id: req.params.id });

        if(req.body.title) {
            review.title = req.body.title;
        }

        if(req.body.content) {
            review.content = req.body.content;
        }

        if(req.body.image) {
            review.image = req.body.image;
        }

        await review.save();
        res.send(review);
    }
    catch {
        res.status(404);
        res.send({ error: 'Review does not exists!'});
    }
});

module.exports = router;