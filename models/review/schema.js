const mongoose = require('mongoose');
const Provider = require('../provider');
const User = require('../user');

const schema = mongoose.Schema({
    provider: {
        type: mongoose.ObjectId,
        ref: Provider,
        required: true,
        unique: false,
    },
    reviewer: {
        type: mongoose.ObjectId,
        ref: User,
        required: true,
        unique: false,
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
    timeCreated: {
        type: Date,
        required: true,
    },
    timeModified: {
        type: Date,
        required: true,
    },
    helpfulness: {
        type: Number,
        required: false,
    },
});

schema.index({ provider: 1, reviewer: 1 }, { unique: true });

module.exports = schema;
