const { ErrorRes, SuccessRes } = require('../../res-model');
const {
    createChannelFailInfo,
    createChannelDbErrorFailInfo,
    updateChannelFailInfo,
    updateChannelDbErrorFailInfo,
    findChannelListFailInfo
} = require('../../res-model/failInfo/channel');
const { createChannelService, updateChannelService, findChannelService } = require('../../service/channel');

/**
 * 创建渠道
 * @param data 渠道数据
 * @returns {Promise<ErrorRes|SuccessRes>}
 */
async function createChannel(data = {}) {
    const { workId, name } = data;
    if (!workId || !name) return new ErrorRes(createChannelFailInfo, '标题和作品 id 不能为空');
    let result;
    try {
        result = await createChannelService(data);
    } catch (e) {
        console.error('创建渠道错误', e);
        return new ErrorRes(createChannelDbErrorFailInfo);
    }
    if (result === null) return new ErrorRes(createChannelFailInfo);
    return new SuccessRes(result);
}

/**
 * 删除渠道
 * @param id id
 * @returns {Promise<ErrorRes|SuccessRes>}
 */
async function deleteChannel(id) {
    if (!id) return new ErrorRes(updateChannelFailInfo, 'id 不能为空');
    let result;
    try {
        result = await updateChannelService(
            {
                status: 0
            },
            {
                id
            }
        );
    } catch (e) {
        console.error('删除渠道错误', e);
        return new ErrorRes(updateChannelDbErrorFailInfo);
    }
    if (result) return new SuccessRes('删除成功'); // 成功
    return new ErrorRes(updateChannelFailInfo);
}

/**
 * 更新渠道
 * @param id id
 * @param name 名称
 * @returns {Promise<ErrorRes|SuccessRes>}
 */
async function updateChannelName(id, name) {
    if (!id || !name) return new ErrorRes(updateChannelFailInfo, 'id 和名称不能为空');
    let result;
    try {
        result = await updateChannelService({ name }, { id });
    } catch (e) {
        console.error('更新渠道错误', e);
        return new ErrorRes(updateChannelDbErrorFailInfo);
    }
    if (result) return new SuccessRes('修改成功');
    return new ErrorRes(updateChannelFailInfo);
}

/**
 * 获取作品的渠道列表
 * @param workId
 * @returns {Promise<ErrorRes|SuccessRes>}
 */
async function getWorkChannels(workId) {
    if (!workId) return new ErrorRes(findChannelListFailInfo, 'id 和名称不能为空');
    const result = await findChannelService({
        workId
    });
    return new SuccessRes(result);
}

module.exports = {
    createChannel,
    deleteChannel,
    updateChannelName,
    getWorkChannels
};
