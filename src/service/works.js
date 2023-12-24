const { Op } = require('sequelize');
const _ = require('lodash');
const { WorkContentModel } = require('../models/WorkContentModel');
const WorksModel = require('../models/WorksModel');
const UserModel = require('../models/UserModel');

/**
 * 创建作品
 * data 作品数据, 按照worksModel的属性规则
 * content 作品内容
 */
async function createWorkService(data = {}, content = {}) {
    // 作品内容 - mongoose
    const { components = [], props = {}, setting = {} } = content;
    const newContent = await WorkContentModel.create({
        components,
        props,
        setting
    });

    // 拿到创建后的作品_id
    const { _id: contentId } = newContent;
    // 创建作品记录 - mysql
    const newWork = await WorksModel.create({
        // 符合 WorksModel
        ...data,
        contentId: contentId.toString() // 需要转换为字符串
    });
    return newWork.dataValues;
}

/**
 * 查询单个作品
 * whereOpt 查询条件
 */
async function findOneWorkService(whereOpt = {}) {
    if (_.isEmpty(whereOpt)) return null; // 无查询条件

    // 查询作品记录 - mysql
    const result = await WorksModel.findOne({
        // 符合 WorksModel 的属性规则
        where: whereOpt,
        include: [
            {
                // 关联User
                model: UserModel,
                attributes: ['userName', 'nickName', 'gender', 'picture']
            }
        ]
    });

    if (result === null) {
        // 未查到
        return result;
    }
    const work = result.dataValues;

    // 查询作品内容  mongodb
    const { contentId } = work;
    const content = await WorkContentModel.findById(contentId);

    // 返回查询结果
    return {
        ...work,
        content
    };
}

/**
 * 更新作品信息
 * data 要更新数据
 * whereOpt 查询提交数据
 * 返回true/false
 */
async function updateWorkService(data = {}, whereOpt = {}) {
    // 保证数据不变
    if (_.isEmpty(data)) return false;
    if (_.isEmpty(whereOpt)) return false;

    // 判断要更新的数据,是否存在
    const work = await findOneWorkService(whereOpt);
    if (work === null) return false;

    // 要更新的数据
    const updateData = data;

    // 更新content -> mongodb
    const { content } = updateData;
    if (content) {
        // 更新content
        const { contentId } = work;
        await WorkContentModel.findByIdAndUpdate(contentId, {
            components: content.components || [],
            props: content.props || {},
            setting: content.setting || {}
        });
    }

    // 删除不需要更新的数据
    delete updateData.id;
    delete updateData.uuid;
    delete updateData.content;
    delete updateData.contentId;

    if (_.isEmpty(updateData)) {
        // 如果用户只更新作品内容，不更新其他数据
        return true;
    }

    // 同时更新mysql
    const result = await WorksModel.update(updateData, { where: whereOpt });
    return result[0] !== 0;
}

/**
 * 查询 作品/模板 列表
 * queryInfo 查询条件
 * pageInfo 分页
 */
async function findWorkListService(queryInfo = {}, pageInfo = {}) {
    // 拼接查询条件
    let whereOpt = {};

    // 1. 处理特殊查询条件
    const { title, status, isTemplate } = queryInfo;
    if (title) {
        Object.assign(whereOpt, {
            title: {
                [Op.like]: `%${title}%`
            }
        });
    }
    delete queryInfo.title; // eslint-disable-line
    if (isTemplate != null) {
        Object.assign(whereOpt, {
            isTemplate: !!isTemplate
        });
        delete queryInfo.isTemplate; // eslint-disable-line
    }
    const statusNum = parseInt(status, 10);
    // eslint-disable-line
    if (isNaN(statusNum)) {
        // status无要求的
        Object.assign(whereOpt, {
            status: {
                [Op.ne]: 0
            }
        });
    } else {
        // 有特殊要求的 例如要发布、未发布这种的
        Object.assign(whereOpt, { status: statusNum });
    }
    delete queryInfo.status; // eslint-disable-line

    // 2.执行其他查询条件
    _.forEach(queryInfo, (value, key) => {
        if (value === null) return;
        whereOpt[key] = value;
    });

    // 执行查询
    const { pageSize, pageIndex } = pageInfo;
    const pageSizeNumber = parseInt(pageSize, 10);
    const pageIndexNumber = parseInt(pageIndex, 10);
    console.log(whereOpt);
    const result = await WorksModel.findAndCountAll({
        limit: pageSizeNumber, // 页容量
        offset: (pageIndexNumber - 1) * pageSizeNumber, // 跳过的多少条
        where: whereOpt,
        order: [
            ['orderIndex', 'desc'],
            ['id', 'desc']
        ],
        include: [
            {
                model: UserModel,
                attributes: ['userName', 'nickName', 'gender', 'picture']
            }
        ]
    });
    const list = result.rows.map((row) => row.dataValues);
    return {
        count: result.count,
        list
    };
}

module.exports = {
    createWorkService,
    findOneWorkService,
    updateWorkService,
    findWorkListService
};
