// 作品内容 model
const mongoose = require('../db/mongoose');

const contentSchema = mongoose.Schema(
    {
        // 页面组件列表
        components: [Object],
        // 页面属性
        props: Object,
        // 配置信息,编辑器右侧配置
        setting: Object
    },
    {
        timestamps: true
    }
);

// 未发布的内容
const WorkContentModel = mongoose.model('worksContent', contentSchema);

// 已发布的内容
const WorkPublishContentModel = mongoose.model('workPublishContent', contentSchema);

module.exports = {
    WorkContentModel,
    WorkPublishContentModel
};
