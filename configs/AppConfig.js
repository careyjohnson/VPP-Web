const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    SALT_ROUND: parseInt(process.env.SALT_ROUND),
    TOKEN_SECRET: process.env.TOKEN_SECRET
};