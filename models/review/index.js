const mongoose = require('mongoose');
const schema = require('./schema');

const decorateWithVirtuals = require('./virtuals');
const statics = require('./statics');
const methods = require('./methods');

decorateWithVirtuals(schema);
Object.assign(schema.methods, methods);
Object.assign(schema.statics, statics);

const Review = mongoose.model('Review', schema);

module.exports = Review;
