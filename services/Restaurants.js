const { CastError } = require('mongoose');

class Restaurants {
    constructor({ db, services }) {
        this.db = db;
        this.services = services;
    }

    async getSome(tags) {
        try {
            const restaurants = await this.db.Restaurant.findByTags(
                tags,
            );

            return {
                success: true,
                data: restaurants,
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                },
            };
        }
    }

    async getOne(id) {
        try {
            const restaurant = await this.db.Restaurant.findById(id);

            if (restaurant) {
                return {
                    success: true,
                    data: restaurant,
                };
            }
            return {
                success: false,
                error: {
                    message: 'Restaurant not found.',
                },
            };
        } catch (error) {
            if (error instanceof CastError) {
                return {
                    success: false,
                    error: {
                        message: 'CastError: ID not valid.',
                        reason: error.reason.message,
                    },
                };
            }
            return {
                success: false,
                error: {
                    message: error.message,
                },
            };
        }
    }
}

module.exports = Restaurants;
