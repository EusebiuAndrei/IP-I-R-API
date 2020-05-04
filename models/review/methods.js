const getObject = async function () {
    const review = this;
    await review.populate('reviewer', 'avatar userId').execPopulate();
    await review.reviewer.populate('userId', 'name').execPopulate();
    const reviewObject = this.toObject();

    delete reviewObject.provider;
    if (reviewObject.reviewer.userId.name) {
        reviewObject.reviewer.name = review.reviewer.userId.name;
    }
    delete reviewObject.reviewer.userId;
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
