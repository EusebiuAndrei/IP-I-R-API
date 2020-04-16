const { responseBuilder } = require('../util/responseUtil');

class Providers {
    constructor({ db }) {
        this.db = db;
    }

    async getSome(tags) {
        const providers = await this.db.Provider.findByTags(tags);
        return responseBuilder(true, providers);
    }

    async getOne(id) {
        const provider = await this.db.Provider.findById(id);
        if (provider) {
            return responseBuilder(true, provider);
        }
        return responseBuilder(false, {
            message: 'Provider not found',
        });
    }
}

module.exports = Providers;
