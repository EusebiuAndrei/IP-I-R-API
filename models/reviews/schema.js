const mongoose = require('mongoose');

const schema = mongoose.Schema({
    provider: {
        type: mongoose.ObjectId,
        required: true,
    },
    reviewer: {
        type: mongoose.ObjectId,
        required: true,
    },
    score: {
        // k score -> k/2 stars
        type: Number,
        min: 1,
        max: 10,
        required: true,
    },
    description: {
        type: String,
        minLength: 1,
        maxLength: 1000, // arbitrary, up for change
    },
    time_created: {
        type: Date,
        required: true,
    },
    time_modified: {
        type: Date,
        required: true,
    },
});

module.exports = schema;
