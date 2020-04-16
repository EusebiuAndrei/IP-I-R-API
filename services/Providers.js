const { CastError } = require('mongoose');
const { responseBuilder } = require('../util/responseUtil');

class Providers {
    constructor({ db }) {
        this.db = db;
    }

    async getSome(tags) {
        try {
            const providers = await this.db.Provider.findByTags(tags);
            return responseBuilder(true, providers);
        } catch (error) {
            return responseBuilder(false, { message: error.message });
        }
    }

    async getOne(id) {
        try {
            const provider = await this.db.Provider.findById(id);
            if (provider) {
                return responseBuilder(true, provider);
            }
            return responseBuilder(false, {
                message: 'Provider not found.',
            });
        } catch (error) {
            if (error instanceof CastError) {
                return responseBuilder(false, {
                    message: 'CastError: ID not valid.',
                    reason: error.reason.message,
                });
            }
            return responseBuilder(false, { message: error.message });
        }
    }
}

module.exports = Providers;
