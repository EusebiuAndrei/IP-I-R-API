class Restaurants {
    constructor({ db, services }) {
        this.db = db;
        this.services = services;
    }

    // mock functions, no database use

    // eslint-disable-next-line no-unused-vars
    async getSome(criteria) {
        return {
            success: true,
            data: Array(10).fill((await this.getOne(1)).data),
        };
    }

    async getOne(id) {
        return {
            success: true,
            data: {
                id,
                name: 'Il Ristorante',
                description:
                    'The most generic restaurant of all time!',
                tags: ['generic', 'fast-food', 'pizza'],
            },
        };
    }
}

module.exports = Restaurants;
