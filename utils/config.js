require('dotenv').config()

const ENVIRONMENT_TYPE = process.env.NODE_ENV

require('dotenv').config({
    path: ENVIRONMENT_TYPE === 'production' ? '.env.production' : '.env.development'
});
module.exports = {
    NODE_ENV    : process.env.NODE_ENV,
    PORT        : process.env.PORT || 4010,
    APP_NAME    : process.env.APP_NAME,
    
    JWT_SECRET  : process.env.JWT_SECRET,
    PASSWORD_SALT : process.env.PASSWORD_SALT,
    ACCESS_TOKEN_SECERT : process.env.ACCESS_TOKEN_SECERT.ACCESS_TOKEN_SECERT,

    DB_USER     : process.env.DB_USER,
    DB_PASS     : process.env.DB_PASS,
    DB_NAME     : process.env.DB_NAME,
    DB_HOST     : process.env.DB_HOST,

    APP_BASE_URL: process.env.APP_BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL
};