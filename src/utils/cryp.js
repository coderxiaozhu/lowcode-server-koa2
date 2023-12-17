const cypto = require('crypto');
const { PASSWORD_SECRET } = require('../config/constant');

// md5加密
function md5Fn(content) {
    const md5 = cypto.createHash('md5');
    return md5.update(content).digest('hex');
}

// 加密
function doCrypto(content) {
    const str = `password=${content}&key=${PASSWORD_SECRET}`;
    return md5Fn(str);
}

module.exports = doCrypto;
