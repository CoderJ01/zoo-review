const router = require('express').Router();
const mongoose = require('mongoose');
const ReviewSchema = require('../models/Review');
const Review = mongoose.model('Review', ReviewSchema);

router.get('/:id', async (req, res) => {
    let review = await Review.find({ _id: req.params.id });
    res.send(review);
});

module.exports = router;