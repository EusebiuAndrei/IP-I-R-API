const ProvidersService = require('./Providers');
const ReviewsService = require('./Reviews');
const { Provider, Review } = require('../models');

const providers = new ProvidersService({
    db: {
        Provider,
    },
});

const reviews = new ReviewsService({
    db: {
        Review,
    },
});

module.exports = {
    providers,
    reviews,
};
