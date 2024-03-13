const config = require('../../utils/config');
const { errorCode, AuthenticationFailed } = require('../../utils/message');
const jwt = require('jsonwebtoken');

const isTokenProvided = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided', statusCode:errorCode });
    }
    next();
}

const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    jwt.verify(token, config.JWT_SECRET, async(err, payload) => {
        if (err) {
            return res.status(403).json({ message: AuthenticationFailed, statusCode:errorCode});
        }
        req.user = payload;
        next()
    })
}

module.exports = {
    requireUserLogin : [
        isTokenProvided,
        isAuthenticated
    ]
}
