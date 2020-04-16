class Reviews {
    constructor({ db }) {
        this.db = db;
    }

    async getForProvider(providerId) {
        const reviews = await this.db.Review.statics.getProviderReviews(
            providerId,
        );
        return reviews.map((review) => review.getObject());
    }

    async put() {
        // ...
    }
}

module.exports = Reviews;
