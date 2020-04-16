const getObject = async function () {
    const review = this;
    await review.populate('reviewer').execPopulate();
    const reviewObject = this.toObject();

    delete reviewObject.provider;
    reviewObject.reviewer = reviewObject.reviewer.name;
    return reviewObject;
};

module.exports = {
    getObject,
};
