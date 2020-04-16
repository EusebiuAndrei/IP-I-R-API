const { ObjectId } = require('mongoose').Types;

const { responseBuilder } = require('../util/responseUtil');

class Reviews {
    constructor({ db }) {
        this.db = db;
    }

    async getForProvider(providerId) {
        const dbReviews = await this.db.Review.getProviderReviews(
            providerId,
        );

        const reviews = await Promise.all(
            dbReviews.map(async (review) => review.getObject()),
        );

        if (reviews.length) {
            const score =
                reviews.reduce(
                    (accumulator, review) =>
                        accumulator + review.score,
                ) / reviews.length;

            return responseBuilder(true, {
                score,
                reviews,
            });
        }
        return responseBuilder(false, {
            message: 'No reviews found for the given provider ID.',
        });
    }

    async post(review) {
        const dbReviewBody = {
            provider: new ObjectId(review.providerId),
            reviewer: new ObjectId(review.reviewerId),
            score: review.score,
            description: review.description,
            timeCreated: new Date(),
            timeModified: new Date(),
        };

        try {
            const result = await this.db.Review.create(dbReviewBody);
            return responseBuilder(true, {
                id: result.id,
            });
        } catch (error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                // duplicate key error
                return responseBuilder(false, {
                    message:
                        'Only one review per reviewer per provider is allowed.',
                });
            }
            throw error;
        }
    }
}

module.exports = Reviews;
