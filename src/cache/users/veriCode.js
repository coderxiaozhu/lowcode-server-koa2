/**
 * 短信验证码  缓存
 */
const { cacheSet, cacheGet } = require('../index');

// cache key 前缀,重要 否则数据容易混乱
const PREFIX = 'phoneVeriCode-';

/**
 * 从缓存获取验证号
 * phoneNumber 手机号
 */
async function getVeriCodeFromCache(phoneNumber) {
    const key = `${PREFIX}${phoneNumber}`;
    const code = await cacheGet(key);
    if (code == null) return code;
    return code.toString(); // cacheGet 方法中有JSON.parse
}

/**
 * 缓存验证码
 * phoneNumber 手机号
 * veriCode 验证码
 * timeout 过期时间
 */
async function setVeriCodeFromCache(phoneNumber, veriCode, timeout) {
    const key = `${PREFIX}${phoneNumber}`;
    cacheSet(key, veriCode, timeout);
}

module.exports = {
    getVeriCodeFromCache,
    setVeriCodeFromCache
};
