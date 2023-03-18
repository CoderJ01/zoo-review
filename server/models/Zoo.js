const mongoose = require('mongoose');
const ReviewSchema = require('./Review');

const ZooSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        image: {
            type: String
        },
        reviews: [ReviewSchema]
    },
    { timestamps: true }
);

const Zoo = mongoose.model('Zoo', ZooSchema);
modules.exports = Zoo;