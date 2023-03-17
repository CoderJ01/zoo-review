const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: [1000, 'No more than 1000 characters allowed, got {VALUE}']
        },
        rating: {
            type: Number,
            required: true,
            min: [1, '1 is the lowest rating allowed, got {VALUE}'],
            max: [5, '5 is the highest rating allowed, got {VALUE}']
        },
        image: {
            type: String,
            required: true,
        },
        averageRating: {
            type: Number,
            required: false
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = ReviewSchema;