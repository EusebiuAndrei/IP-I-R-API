const mongoose = require('mongoose');
const schema = require('./schema');

const statics = require('./statics');

Object.assign(schema.statics, statics);

const Restaurant = mongoose.model('Restaurant', schema);

module.exports = Restaurant;
