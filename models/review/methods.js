const getObject = async function () {
    const review = this;
    await review.populate('reviewer', 'avatar userId').execPopulate();
    await review.reviewer.populate('userId', 'name').execPopulate();
    const reviewObject = this.toObject({ virtuals: true });

    delete reviewObject.provider;
    reviewObject.reviewer.userId = reviewObject.reviewer.userId.name;
    return reviewObject;
};

const patchHelpfulness = function (delta) {
    const review = this;
    review.helpfulness += delta;
};

module.exports = {
    getObject,
    patchHelpfulness,
};
