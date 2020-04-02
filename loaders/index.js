const debug = require('debug')('app:loaders');
const expressLoader = require('./express');

module.exports = async ({ expressApp }) => {
    try {
        await expressLoader(expressApp);
        debug('express loaded');
    } catch (error) {
        debug('error');
    }
};
