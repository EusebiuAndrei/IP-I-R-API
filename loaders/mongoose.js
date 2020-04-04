const mongoose = require('mongoose');
const config = require('../config').database;

module.exports = async () => {
    await mongoose.connect(config.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};
