const ProvidersService = require('./Providers');
const { Provider } = require('../models');

const providers = new ProvidersService({
    db: {
        Provider,
    },
});

module.exports = {
    providers,
};
