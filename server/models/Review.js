const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
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
    {timestamps: true}
);

module.exports = mongoose.model('Review', ReviewSchema);