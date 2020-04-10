const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
});

module.exports = schema;
