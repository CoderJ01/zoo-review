const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);