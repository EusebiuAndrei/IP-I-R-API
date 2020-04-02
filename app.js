const express = require('express');
const debug = require('debug')('app');

const config = require('./config');
const loaders = require('./loaders');

(async function main() {
    const app = express();
    await loaders({ expressApp: app });

    app.listen(config.port, (err) => {
        if (err) {
            debug(err);
            throw new Error('app.listen');
        }
        debug(`Server listening on port: ${config.port}`);
    });
})();
