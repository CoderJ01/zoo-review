const mongoose = require('mongoose');
const BlogSchema = require('./Blog');
const ReviewSchema = require('./Review');

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
            required: true, 
            unique: true
        }, 
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            maxLength: [200, 'No more than 200 characters allowed']
        },
        avatar: {
            type: String,
        },
        randomString: {
            type: String
        },
        admin: {
            type: Boolean
        },
        likedBlogs: {
            type: [String]
        },
        dislikedBlogs: {
            type: [String]
        },
        reviews: [ReviewSchema],
        blogs: [BlogSchema],
    }, 
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;