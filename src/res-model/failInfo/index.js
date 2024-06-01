const errorInfos = require('./error');
const usersInfo = require('./users');
const validateInfo = require('./validate');
const worksInfo = require('./works');
const channelInfo = require('./channel');

module.exports = {
    ...errorInfos,
    ...usersInfo,
    ...validateInfo,
    ...worksInfo,
    ...channelInfo
};
