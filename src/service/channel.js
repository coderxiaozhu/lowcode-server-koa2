const { Op } = require('sequelize');
const _ = require('lodash');
const ChannelModel = require('../models/ChannelModel');

/**
 * 创建渠道
 */
async function createChannelService(data = {}) {
    const newChannel = await ChannelModel.create(data);
    return newChannel.dataValues;
}

/**
 * 更新渠道
 */
async function updateChannelService(data = {}, whereOpt = {}) {
    if (_.isEmpty(whereOpt)) return false;
    if (_.isEmpty(data)) return false;
    console.log(data, whereOpt);
    const result = await ChannelModel.update(data, { where: whereOpt });
    return result[0] !== 0;
}

/**
 * 查询渠道
 */
async function findChannelService(whereOpt = {}) {
    if (whereOpt.status === null) {
        Object.assign(whereOpt, {
            status: {
                [Op.ne]: 0
            }
        });
    }
    const result = await ChannelModel.findAndCountAll({
        order: [
            ['id', 'desc'] // 倒序
        ],
        where: whereOpt
    });

    // result.count 总数，忽略了 limit 和 offset
    // result.rows 查询结果，数组
    const list = result.rows.map((row) => row.dataValues);
    return {
        count: result.count,
        list
    };
}

module.exports = {
    createChannelService,
    updateChannelService,
    findChannelService
};
