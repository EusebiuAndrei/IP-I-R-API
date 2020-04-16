const { ObjectId } = require('mongoose').types;
const { CastError } = require('mongoose');

const { responseBuilder } = require('../util/responseUtil');

class Reviews {
    constructor({ db }) {
        this.db = db;
    }

    async getForProvider(providerId) {
        try {
            const dbReviews = await this.db.Review.statics.getProviderReviews(
                providerId,
            );

            const reviews = dbReviews.map((review) =>
                review.getObject(),
            );

            if (reviews) {
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
                message:
                    'No reviews found for the given provider ID.',
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

    async post(review) {
        const dbReviewBody = {
            provider: new ObjectId(review.providerId),
            reviewer: new ObjectId(review.reviewerId),
            score: review.score,
            description: review.description,
            timeCreated: new Date(),
            timeUpdated: new Date(),
        };

        try {
            const result = await this.db.Review.create(dbReviewBody);

            return responseBuilder(true, {
                id: result.id,
            });
        } catch (error) {
            return responseBuilder(false, {
                message: error.message,
            });
        }
    }
}

module.exports = Reviews;
