const util = require('util');
const jwt = require('jsonwebtoken');

// jwt密钥
const { JWT_SECRET } = require('../config/constant');

// jwt过期时间
const { jwtExpiresIn } = require('../config/index');

const verify = util.promisify(jwt.verify);

/**
 * jwt verify 解密
 * token
 */
async function jwtVerify(token) {
    const data = await verify(token.split(' ')[1], JWT_SECRET); // 去除掉前面的Bearer
    return data;
}

/**
 * jwt verify 加密
 * data data
 */
function jwtSign(data) {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: jwtExpiresIn });
    return token;
}

// 导出解密,加密两个方法
module.exports = {
    jwtVerify,
    jwtSign
};
