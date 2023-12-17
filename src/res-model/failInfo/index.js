const errorInfos = require('./error');
const usersInfo = require('./users');
const validateInfo = require('./validate');

module.exports = {
    ...errorInfos,
    ...usersInfo,
    ...validateInfo
};
