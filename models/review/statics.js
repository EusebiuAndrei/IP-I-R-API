const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

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

const getProviderReviews = async function (
    providerId,
    orderBy,
    skip,
    limit,
) {
    const query = this.find({
        provider: ObjectId(providerId),
    });
    if (orderBy) {
        query.sort(orderBy);
    }
    if (skip) {
        query.skip(skip);
    }
    if (limit) {
        query.limit(limit);
    }

    return query.exec();
};

module.exports = {
    getProviderScore,
    getProviderReviews,
};
