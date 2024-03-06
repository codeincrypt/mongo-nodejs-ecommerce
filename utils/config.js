require('dotenv').config();
module.exports = {
    ENVIRONMENT : process.env.NODE_ENV || 'development',
    PORT        : process.env.PORT || 4010,
    APP_NAME    : process.env.APP_NAME,
    SALT        : process.env.PASSWORD_SALT,
    JWT_SECRET  : process.env.JWT_SECRET
};