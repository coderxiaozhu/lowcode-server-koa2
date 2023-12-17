/**
 * 模拟发短信
 */

/**
 * 发送短信验证号
 * phoneNumber 手机号
 * code 验证码
 * timeout 过期时间 timeout = '' 先不使用
 */
async function sendVeriCodeMsg(phoneNumber, code) {
    if (!phoneNumber || !code) return Promise.reject(new Error('手机号或者验证码为空'));
    return Promise.resolve('ok');
}

module.exports = {
    sendVeriCodeMsg
};
