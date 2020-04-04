const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
    throw new Error('dotenv.config');
}

module.exports = {
    port: parseInt(process.env.PORT, 10),
    api: {
        prefix: '/api',
    },
    database: {
        URL: process.env.DB_CONNECTION,
    },
};
