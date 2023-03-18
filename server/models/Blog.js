const mongoose = require('mongoose');

// required should not be set to true in any field; or else, PATCH route will not work
const BlogSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        image: {
            type: String,
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