const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
    throw new Error('dotenv.config');
}

module.exports = {
    port: parseInt(process.env.PORT, 10),
};
