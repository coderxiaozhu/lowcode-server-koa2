// 数据校验 作品
const strRule = {
    type: 'string',
    maxLength: 255
};

// 创建作品
const workInfoSchema = {
    type: 'object',
    // 用户信息要符合 WorksModel 配置
    required: ['title'],
    properties: {
        title: strRule,
        desc: strRule,
        coverImg: strRule,
        contentId: strRule,
        // 作品内容 -- 这个不在WorkModel中
        content: {
            type: 'object',
            // 符合 WorkContentModel 属性规则
            properties: {
                _id: strRule,
                components: {
                    type: 'array'
                },
                props: {
                    type: 'object'
                },
                setting: {
                    type: 'object'
                }
            }
        }
    }
};

module.exports = {
    workInfoSchema
};
