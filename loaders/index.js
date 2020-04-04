const debug = require('debug')('app:loaders');
const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

module.exports = async ({ expressApp }) => {
    try {
        await mongooseLoader();
        debug('mongoose loaded');

        await expressLoader(expressApp);
        debug('express loaded');
    } catch (error) {
        debug('error');
    }
};
