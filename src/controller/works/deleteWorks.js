const { ErrorRes, SuccessRes } = require('../../res-model');
const { deleteWorkFailInfo, deleteWorkDbErrorFailInfo } = require('../../res-model/failInfo');
const { updateWorkService } = require('../../service/works');

/**
 * id
 * author userName
 * putBack 恢复删除
 */
async function deleteWork(id, author, putBack = false) {
    let res;
    try {
        // 假删除
        const status = putBack === true ? 1 : 0;
        res = await updateWorkService(
            { status },
            { id, author } // 只能删除自己的
        );
    } catch (error) {
        console.error('删除作品错误', error);
        return new ErrorRes(deleteWorkDbErrorFailInfo);
    }
    // 删除成功返回
    let retStr = putBack === true ? '恢复作品成功' : '删除作品成功';
    if (res) return new SuccessRes({ message: retStr });
    // 删除失败
    return new ErrorRes(deleteWorkFailInfo, 'id 或 author不匹配');
}

/**
 * id 作品id
 * author 作者
 * putBack 恢复删除
 */
async function putBackWork(id, author) {
    const res = await deleteWork(id, author, true);
    return res;
}

module.exports = {
    deleteWork,
    putBackWork
};
