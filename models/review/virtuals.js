const User = require('../user');
const Client = require('../client');

module.exports = (schema) => {
    schema.virtual('reviewerInfo').get(async function () {
        const { avatar, userId } = await Client.findById(
            this.reviewer,
            {
                avatar: 1,
                userId: 1,
            },
        );
        const { name } = await User.findById(userId, { name: 1 });

        return { name, avatar };
    });
};
