const _ = require('lodash');
const UserModel = require('../models/UserModel');

/**
 * 查找用户信息
 */
async function findOneUserService({ userName, password, phoneNumber }) {
    // 拼接查询条件
    const whereOpt = {};
    if (userName) {
        Object.assign(whereOpt, { userName });
    }
    if (password) {
        // 用户名和密码一块,因为密码可能重复
        Object.assign(whereOpt, { userName, password });
    }
    if (phoneNumber) Object.assign(whereOpt, { phoneNumber });

    // 无查询条件,则返回空
    if (_.isEmpty(whereOpt)) return null;

    // 查询
    const result = await UserModel.findOne({
        where: whereOpt
    });
    if (result == null) {
        // 未查询到用户
        return result;
    }
    // 返回查询结果
    return result.dataValues;
}

/**
 * 创建用户
 * 用户信息,要符合UserModel的属性
 */
async function createUserService(data = {}) {
    const result = await UserModel.create(data);
    return result.dataValues;
}

/**
 * 修改用户
 */
async function updateUserInfoService(userName, data = {}) {
    if (!userName) return false;
    if (_.isEmpty(data)) return false;
    const result = await UserModel.update(data, {
        where: {
            userName
        }
    });
    return result[0] != 0;
}

module.exports = {
    findOneUserService,
    createUserService,
    updateUserInfoService
};
