const RestaurantsService = require('./Restaurants');
const { Restaurant } = require('../models');

const restaurants = new RestaurantsService({
    db: {
        Restaurant,
    },
    services: {},
});

module.exports = {
    restaurants,
};
