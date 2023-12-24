const { v4: uuidV4 } = require('uuid');
const { ErrorRes, SuccessRes } = require('../../res-model');
const {
    createWorksDbErrorFailInfo,
    createWorksFailInfo,
    forceOffLineFailInfo
} = require('../../res-model/failInfo/index');
const { createWorkService, findOneWorkService, updateWorkService } = require('../../service/works');

/**
 * 创建作品
 * author 作者 username
 * 作品数据 data
 * 作品内容 content
 */
async function createWorks(author, data = {}, content = {}) {
    const { title } = data;
    if (!title) {
        // 标题不能为空
        return new ErrorRes(createWorksFailInfo, '标题不能为空');
    }
    // uuid过长的话生成的二维码会不好扫描，所以这里只截取前四位
    const uuid = uuidV4().slice(0, 4);
    try {
        const newWork = await createWorkService(
            {
                ...data,
                author,
                uuid
            },
            content
        );
        // 创建成功
        return new SuccessRes(newWork);
    } catch (error) {
        console.error('创建作品失败', error);
        // TODO 报警
        return new ErrorRes(createWorksDbErrorFailInfo); // 导入数据库失败
    }
}

/**
 * 复制作品(通过模板创建,也是复制)
 * id id
 * author 作者userName
 */
async function copyWorks(id, author) {
    const work = await findOneWorkService({ id }); // 被复制的项目不一定是自己的, 所以查询条件不加author

    // 是否强制下线
    if (parseInt(work.status, 10) === 3) {
        return new ErrorRes(forceOffLineFailInfo);
    }

    // 创建一个作品
    const { content } = work;
    // 新项目信息, 符合workModel
    const newData = {
        title: `${work.title}-复制`,
        desc: work.desc,
        coverImg: work.coverImg
    };

    // 创建新项目
    const res = await createWorks(author, newData, content);

    // 更新源数据使用次数
    await updateWorkService(
        {
            copiedContent: work.copiedContent + 1
        },
        { id }
    );

    return res;
}

module.exports = {
    createWorks,
    copyWorks
};
