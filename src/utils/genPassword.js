const { v4: uuidV4 } = require('uuid');

/**
 * 生成一个密码
 */
module.exports = function genPassword() {
    // 格式如 5e79b94b-548a-444a-943a-8a09377e3744
    const s = uuidV4();
    return s.split('-')[0];
};
