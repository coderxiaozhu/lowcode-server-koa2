// 封装实体模型的类型
const Sequelize = require('sequelize');

module.exports = {
    STRING: Sequelize.STRING,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN,
    DATE: Sequelize.DATE
};
