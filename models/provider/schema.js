const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    description: {
        type: String,
        minLength: 1,
    },
    tags: [
        {
            type: String,
            minLength: 1,
        },
    ],
});

module.exports = schema;