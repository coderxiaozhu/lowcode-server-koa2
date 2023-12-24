const { DEFAULT_PAGE_SIZE } = require('../../config/constant');
const { findOneWorkFailInfo, findOneWorkDbErrorFailInfo } = require('../../res-model/failInfo/works');
const { ErrorRes, SuccessRes } = require('../../res-model/index');
const { findOneWorkService, findWorkListService } = require('../../service/works');

/**
 * 查询单个作品
 * id
 * author 作者 userName (保证安全性,避免查询他人作品)
 */
async function findOneWork(id, author) {
    if (!id || !author) return ErrorRes(findOneWorkFailInfo, 'id 或 author为空');

    let work;
    try {
        work = await findOneWorkService({
            id,
            author
        });
    } catch (err) {
        console.error('查询单个作品', err);
        return new ErrorRes(findOneWorkDbErrorFailInfo);
    }

    // 查询失败
    if (work === null) return new ErrorRes(findOneWorkFailInfo, 'id 或 author不匹配');

    // 查询成功
    return new SuccessRes(work);
}

/**
 * 获取我的作品或模板
 * author 作者
 * queryInfo 查询条件
 * pageInfo 分页
 */
async function findMyWorks(author, queryInfo = {}, pageInfo = {}) {
    const { title, status, isTemplate } = queryInfo;
    let { pageIndex, pageSize } = pageInfo;

    pageIndex = parseInt(pageIndex, 10) || 0;
    pageSize = parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE;

    const { list, count } = await findWorkListService(
        {
            title,
            status,
            author,
            isTemplate: isTemplate === '1'
        },
        {
            pageIndex,
            pageSize
        }
    );
    return new SuccessRes({ list, count });
}

module.exports = {
    findOneWork,
    findMyWorks
};
