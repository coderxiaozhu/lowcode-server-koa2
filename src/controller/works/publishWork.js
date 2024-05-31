const { h5Origin } = require('../../config/envs/dev');
const { ErrorRes, SuccessRes } = require('../../res-model');
const { publishWorkDbErrorFailInfo, forceOffLineFailInfo, publishWorkFailInfo } = require('../../res-model/failInfo');
const { findOneWorkService, updatePublishContentService, updateWorkService } = require('../../service/works');

/**
 * 发布项目
 * id id
 * author 作者 userName
 * isTemplate 设置为模板
 */
async function publishWork(id, author, isTemplate = false) {
    const work = await findOneWorkService({
        id,
        author
    });
    if (work === null) return new ErrorRes(publishWorkDbErrorFailInfo, 'id 或者作者不匹配');

    // 是否强制下线
    if (parseInt(work.status, 10) === 3) {
        return new ErrorRes(forceOffLineFailInfo);
    }

    // 发布, 需要更新的数据
    const updateData = {
        status: 2,
        latestPublishAt: new Date()
    };
    if (isTemplate) {
        // 发布为模板
        Object.assign(updateData, {
            isTemplate: true
        });
    }
    let result;
    try {
        // 更新发布的内容
        const publishContentId = await updatePublishContentService(work.content, work.publishContentId);

        // 更新作品状态
        result = await updateWorkService(
            {
                publishContentId,
                ...updateData
            },
            {
                id,
                author
            }
        );
    } catch (error) {
        console.error('发布作品错误:', error);
        // 报警, 发布作品错误
        return new ErrorRes(publishWorkDbErrorFailInfo);
    }

    if (!result) return new ErrorRes(publishWorkFailInfo); // 发布失败

    // 发布成功, 返回链接
    const url = `${h5Origin}/p/${work.id}-${work.uuid}`;
    return new SuccessRes({ url });
}

module.exports = {
    publishWork
};
