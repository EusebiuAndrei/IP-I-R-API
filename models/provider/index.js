const mongoose = require('mongoose');
const schema = require('./schema');

const statics = require('./statics');

Object.assign(schema.statics, statics);

const Provider = mongoose.model('Provider', schema);

module.exports = Provider;
