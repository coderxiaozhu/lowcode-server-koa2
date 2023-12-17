const { updateUserInfoService } = require('../../service/users');
const { updateUserInfoDbErrorFailInfo, updateUserInfoFailInfo } = require('../../res-model/failInfo/index');
const { ErrorRes, SuccessRes } = require('../../res-model/index');
const { jwtSign } = require('../../utils/jwt');

// 修改用户信息
async function updateUserInfo(curUserInfo, data = {}) {
    const { userName } = curUserInfo;
    let res;
    try {
        res = await updateUserInfoService(userName, data);
    } catch (error) {
        console.error('修改用户信息', error);
        return new ErrorRes(updateUserInfoDbErrorFailInfo); // 数据库操作失败
    }

    // 修改成功
    if (res) {
        const newUserInfo = {
            ...curUserInfo,
            ...data
        };
        delete newUserInfo.iat;
        delete newUserInfo.exp;
        return new SuccessRes({
            token: jwtSign(newUserInfo)
        });
    }
    // 修改失败
    return new ErrorRes(updateUserInfoFailInfo); // 失败，但是数据库操作正常
}

module.exports = updateUserInfo;
