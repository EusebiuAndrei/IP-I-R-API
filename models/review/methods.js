const getObject = async function () {
    const review = this;
    await review.populate('reviewer').execPopulate();
    const reviewObject = this.toObject();

    delete reviewObject.provider;
    reviewObject.reviewer = reviewObject.reviewer.name;
    return reviewObject;
};

const patchHelpfulness = function (delta) {
    const review = this;
    if (!review.helpfulness) {
        review.helpfulness = 0;
    }
    review.helpfulness += delta;
    if (review.helpfulness === 0) {
        review.helpfulness = undefined;
    }
};

module.exports = {
    getObject,
    patchHelpfulness,
};
