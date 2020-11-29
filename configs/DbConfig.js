const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    password: process.env.DB_PASSWORD || 'dbpassword',
    user: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 33060,
    schema: 'vppshop'
};