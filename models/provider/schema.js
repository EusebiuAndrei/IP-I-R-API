const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
    },
    description: {
        type: String,
        min: 1,
    },
    tags: [
        {
            type: String,
        },
    ],
});

module.exports = schema;
