const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        thumbs: {
            type: Number,
            default: 0
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = BlogSchema;