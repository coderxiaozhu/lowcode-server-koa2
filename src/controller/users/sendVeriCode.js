const { getVeriCodeFromCache, setVeriCodeFromCache } = require('../../cache/users/veriCode');

const { SuccessRes, ErrorRes } = require('../../res-model');
const { isProd, isTest } = require('../../utils/env');
const { sendVeriCodeFrequentlyFailInfo, sendVeriCodeErrorFailInfo } = require('../../res-model/index');
const { msgVeriCodeTimeout } = require('../../config/index');
const { sendVeriCodeMsg } = require('../../vendor/sendMsg');

/**
 * 发送短信验证码
 * phoneNumber 手机号
 * isRemoteTest 是否测试
 */
async function sendVeriCode(phoneNumber, isRemoteTest = false) {
    // 从缓存存取验证码，看是否有效
    const codeFromCode = await getVeriCodeFromCache(phoneNumber);
    if (codeFromCode) {
        if (!isProd) {
            // 非线上环境，则直接返回
            return new SuccessRes({ code: codeFromCode });
        }
        // 说明刚刚已经发送过，不要再重新发送 —— 【注意】如不做这个限制，轻易重复发送，短信服务将浪费不少钱
        return new ErrorRes(sendVeriCodeFrequentlyFailInfo);
    }
    // 缓存中没有,则发送
    const veriCode = Math.random().toString().slice(-4); // 生成随机数
    let sendSuccess = true;

    if (isTest) {
        // 测试直接返回验证码
        sendSuccess = true;
    } else if (isRemoteTest) {
        // 远程接口测试，直接返回验证码
        sendSuccess = true;
    } else {
        // 其他情况直接发短信
        try {
            // 短信提示过期时间(单位/分钟)
            const msgTimeoutMin = (msgVeriCodeTimeout / 60).toString();
            // 发送短信
            await sendVeriCodeMsg(phoneNumber, veriCode, msgTimeoutMin);
            sendSuccess = true;
        } catch (error) {
            sendSuccess = false;
            console.error('发送短信验证码失败', error);

            // TODO: 及时报警,尽快解决问题
        }
    }

    if (!sendSuccess) {
        return new ErrorRes(sendVeriCodeErrorFailInfo);
    }

    // 发送短信成功, 然后缓存, 设置timeout 重要
    setVeriCodeFromCache(phoneNumber, veriCode, msgVeriCodeTimeout);

    // 返回成功信息
    const resData = isProd
        ? {}
        : {
            code: veriCode // 非线上环境返回验证码
        };
    return new SuccessRes(resData);
}

module.exports = sendVeriCode;
