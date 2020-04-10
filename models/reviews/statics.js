const mongoose = require('mongoose');

const { ObjectId } = mongoose.types;

const getProviderScore = async function (providerId) {
    const result = await this.aggregate()
        .match({
            provider: ObjectId(providerId),
        })
        .group({
            average: { $avg: '$score' },
        });
    return result.average;
};

const getProviderReviews = async function (providerId) {
    return this.find({
        provider: ObjectId(providerId),
    });
};

module.exports = {
    getProviderScore,
    getProviderReviews,
};
