const _ = require('lodash');
const { ErrorRes, SuccessRes } = require('../../res-model');
const { updateWorkFailInfo, updateWorkDbErrorFailInfo, transferWorkFailInfo } = require('../../res-model/failInfo');
const { updateWorkService } = require('../../service/works');
const { findOneUserService } = require('../../service/users');

/**
 * id,
 * author 作者 userName
 * data 作品数据
 */
async function updateWorks(id, author, data = {}) {
    // 保证数据不为空
    if (!id || !author) return new ErrorRes(updateWorkFailInfo, 'id或author不能为空');
    if (_.isEmpty(data)) return new ErrorRes(updateWorkFailInfo, '更新数据不能为空');

    let res;
    try {
        res = await updateWorkService(data, { id, author });
    } catch (error) {
        console.error('更新作品错误', id, error);
        // TODO 报警: 更新作品id错误
        return new ErrorRes(updateWorkDbErrorFailInfo);
    }

    // 更新成功
    if (res) return new SuccessRes({ message: '更新成功' });
    // 更新失败
    return new ErrorRes(updateWorkFailInfo, 'id 或 author不匹配');
}

/**
 * 转赠作品
 * id
 * author 作者 userName
 * receiverUsername 接收人 receiverUsername
 */
async function transferWorks(id, author, receiverUserName) {
    // 作者和接收人不能相同
    if (author === receiverUserName) return new ErrorRes(transferWorkFailInfo, '作者和接收人相同');

    // 判断接收者是否存在
    const receiver = await findOneUserService({ userName: receiverUserName });

    if (receiver === null) return new ErrorRes(transferWorkFailInfo, '接收人未找到');

    const res = await updateWorks(id, author, {
        author: receiverUserName
    });
    return res;
}

module.exports = {
    updateWorks,
    transferWorks
};
