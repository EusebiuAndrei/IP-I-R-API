const findByTags = async function (tags) {
    return this.find({
        tags: { $all: tags },
    });
};

module.exports = {
    findByTags,
};
