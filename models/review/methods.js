const getObject = async function () {
    const review = this;
    await review.populate('reviewer').execPopulate();
    const reviewObject = this.toObject();

    delete reviewObject.provider;
    return reviewObject;
};

module.exports = {
    getObject,
};
