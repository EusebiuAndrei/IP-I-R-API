const findByTags = async function (tags) {
    let filter = {};
    if (tags.length) {
        filter = {tags: { $all: tags }}
    }
    return this.find(filter);
};

module.exports = {
    findByTags,
};
