const mongoose = require('mongoose');
const schema = require('./schema');

const Provider = mongoose.model('Provider', schema);

module.exports = Provider;
