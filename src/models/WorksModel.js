// 作品 model
const seq = require('../db/seq/seq');
const { INTEGER, STRING, BOOLEAN, DATE } = require('../db/seq/types');
const UserModel = require('./UserModel');

// 作品
const Work = seq.define('work', {
    uuid: {
        type: STRING,
        allowNull: false,
        unique: 'uuid',
        comment: 'uuid, H5 url中使用, 防止被爬'
    },
    title: {
        type: STRING,
        allowNull: false,
        comment: '标题'
    },
    desc: {
        type: STRING,
        comment: '副标题'
    },
    contentId: {
        type: STRING,
        allowNull: false,
        unique: 'contentId',
        comment: '内容id, 内容存储在mongodb中'
    },
    publishContentId: {
        type: STRING,
        unique: 'publishContentId',
        comment: '发布内容id, 内容存储在mongodb中, 未发布的为空'
    },
    author: {
        type: STRING,
        allowNull: false,
        comment: '作者 username'
    },
    coverImg: {
        type: STRING,
        comment: '封面图片url'
    },
    isTemplate: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否模板'
    },
    status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '状态: 0-删除, 1-未发布, 2-发布, 3-强制下线'
    },
    copiedContent: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '被复制的次数'
    },
    latestPublishAt: {
        type: DATE,
        defaultValue: null,
        comment: '最后一次发布的时间'
    },
    isHot: {
        type: BOOLEAN,
        defaultValue: null,
        comment: 'hot标签, 模板使用'
    },
    isNew: {
        type: BOOLEAN,
        defaultValue: false,
        comment: 'new标签, 模板使用'
    },
    orderIndex: {
        type: INTEGER,
        defaultValue: 0,
        comment: '排序参数'
    },
    isPublish: {
        type: BOOLEAN,
        defaultValue: false,
        comment: '是否公开显示,在首页公共的模板列表'
    }
});

// 和userModel建立关系
Work.belongsTo(UserModel, {
    foreignKey: 'author',
    targetKey: 'username' // 对应UserModel.username
});

module.exports = Work;
