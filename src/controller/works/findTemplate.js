const { DEFAULT_PAGE_SIZE } = require('../../config/constant');
const { SuccessRes, ErrorRes } = require('../../res-model');
const { findOneWorkFailInfo, findOneWorkDbErrorFailInfo } = require('../../res-model/failInfo/works');
const { findWorkListService, findOneWorkService } = require('../../service/works');

/**
 * 隐藏手机号
 * number 手机号
 */
function hidePhoneNumber(number = '') {
    const n = number.toString();

    if (!n) return n;

    const reg = /^1[3456789]\d{9}$/; // 手机号正则
    if (reg.test(n) === false) return n;
    return n.slice(0, 3) + '****' + n.slice(-4); // eslint-disable-line
}

/**
 * 格式化公共的模板数据, 隐藏一些手机号和用户名信息
 */
function formatTemplate(template = {}) {
    // 判断传入的template是否数组
    if (Array.isArray(template)) {
        return template.map((t) => formatTemplate(t));
    }

    // 传入的template不是数组
    const result = template;

    // 用户名就是手机号
    result.author = hidePhoneNumber(result.author);
    if (result.user) {
        const user = result.user.dataValues;
        user.userName = hidePhoneNumber(user.userName);
    }
    return result;
}

/**
 * 查询公共模板
 * queryInfo 查询条件
 * pageInfo 分页
 */
async function findPublicTemplates(queryInfo = {}, pageInfo = {}) {
    const { title } = queryInfo;
    let { pageIndex, pageSize } = pageInfo;
    pageIndex = parseInt(pageIndex, 10) || 0;
    pageSize = parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE;
    const { list, count } = await findWorkListService(
        {
            title,
            isTemplate: true,
            isPublic: true // 公开
        },
        {
            pageIndex,
            pageSize
        }
    );
    const formatList = formatTemplate(list);
    return new SuccessRes({ list: formatList, count });
}

/**
 * 查询单个作品
 * id
 */
async function fineOneTemplate(id) {
    if (!id) return new ErrorRes(findOneWorkFailInfo, 'id 为空');

    let template;
    try {
        template = await findOneWorkService({
            id,
            isTemplate: true, // 是否模板
            isPublic: true // 是否公开
        });
    } catch (error) {
        console.error('查询单个模板', error);
        return new ErrorRes(findOneWorkDbErrorFailInfo);
    }

    if (template == null) return new ErrorRes(findOneWorkFailInfo);

    // 数据格式化
    template = formatTemplate(template);

    // 查询成功
    return new SuccessRes(template);
}

module.exports = {
    findPublicTemplates,
    fineOneTemplate
};
