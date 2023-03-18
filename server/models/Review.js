const mongoose = require('mongoose');

// required should not be set to true in any field; or else, PATCH route will not work
const ReviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false 
        },
        content: {
            type: String,
            required: false,
            maxlength: [1000, 'No more than 1000 characters allowed, got {VALUE}']
        },
        rating: {
            type: Number,
            required: false,
            min: [1, '1 is the lowest rating allowed, got {VALUE}'],
            max: [5, '5 is the highest rating allowed, got {VALUE}']
        },
        image: {
            type: String,
            required: false
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