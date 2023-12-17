const { getVeriCodeFromCache } = require('../../cache/users/veriCode');
const { ErrorRes, SuccessRes } = require('../../res-model');
const {
    loginVeriCodeIncorrectFailInfo,
    userFrozenFailInfo,
    createUserDbErrorFailInfo
} = require('../../res-model/failInfo');
const { findOneUserService, updateUserInfoService, createUserService } = require('../../service/users');
const { jwtSign } = require('../../utils/jwt');
const genPassword = require('../../utils/genPassword');
const doCrypto = require('../../utils/cryp');

/**
 * 通过手机验证码登录
 * phoneNumber 手机号
 * veriCode 验证码
 */
async function loginByPhoneNumber(phoneNumber, veriCode) {
    const veriCodeFromCache = await getVeriCodeFromCache(phoneNumber);
    if (veriCode !== veriCodeFromCache) {
        // 验证码不正确
        return new ErrorRes(loginVeriCodeIncorrectFailInfo);
    }
    // 先查找,找到的就返回
    const userInfo = await findOneUserService({
        phoneNumber
    });
    if (userInfo) {
        // 用户是否冻结
        if (userInfo.isFrozen) return new ErrorRes(userFrozenFailInfo);

        // 更新最后时间
        try {
            await updateUserInfoService(userInfo.userName, {
                latestLoginAt: new Date()
            });
        } catch (error) {
            // 只记录错误，不是主要错误，不影响登录逻辑
            console.log('更新最后登录时间错误', error);
        }

        // 返回登录成功信息
        return new SuccessRes({
            token: jwtSign(userInfo)
        });
    }
    // 查找不到, 在创建
    let password = genPassword(); // 手机号注册,生成随机码
    password = doCrypto(password); // 加密密码

    try {
        const newUser = await createUserService({
            // 要符合 UserModel的属性规定
            userName: phoneNumber,
            password,
            phoneNumber,
            nickName: `lowcode${phoneNumber.slice(-4)}`, // 默认昵称
            latestLoginAt: new Date()
        });
        // 创建成功
        return new SuccessRes({
            token: jwtSign(newUser)
        });
    } catch (error) {
        console.error('创建用户失败', error);
        return new ErrorRes(createUserDbErrorFailInfo);
    }
}

module.exports = loginByPhoneNumber;
