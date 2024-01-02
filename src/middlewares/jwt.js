const jwtKoa = require('koa-jwt');
const { JWT_SECRET, JWT_IGNORE_PATH } = require('../config/constant');

const jwt = jwtKoa({
    secret: JWT_SECRET,
    cookie: 'jwt_token'
}).unless({
    path: JWT_IGNORE_PATH
});

module.exports = jwt;
