const expressJwt = require('express-jwt');

module.exports = {
    isAuthenticated: expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
};