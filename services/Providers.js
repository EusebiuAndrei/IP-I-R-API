const { CastError } = require('mongoose');

class Providers {
    constructor({ db }) {
        this.db = db;
    }

    async getSome(tags) {
        try {
            const providers = await this.db.Provider.findByTags(tags);

            return {
                success: true,
                data: providers,
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
            const provider = await this.db.Provider.findById(id);

            if (provider) {
                return {
                    success: true,
                    data: provider,
                };
            }
            return {
                success: false,
                error: {
                    message: 'Provider not found.',
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

module.exports = Providers;
