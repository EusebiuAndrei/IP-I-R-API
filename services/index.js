const RestaurantsService = require('./Restaurants');

const restaurants = new RestaurantsService({
    db: null,
    services: {},
});

module.exports = {
    restaurants,
};
