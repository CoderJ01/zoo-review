const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: false
        },
        avatar: {
            type: String,
            required: true
        },
        reviews: [{
            type: mongoose.Types.ObjectId,
            ref: 'Review'
        }],
        blogs: [{
            type: mongoose.Types.ObjectId,
            ref: 'Blog'
        }],
    }, 
    { timestamps: true }
);

module.exports = ('User', UserSchema);