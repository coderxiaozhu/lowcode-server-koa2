const Sequelize = require('sequelize')
const { mysqlConfig } = require("../../config/envs/dev")
const { isProd, isTest } = require("../../utils/env")

// 连接配置
const { database, user, password, host, port } = mysqlConfig
const conf = {
    host,
    port,
    dialect: 'mysql'
}

// 测试环境不打印日志
if (isTest) {
    conf.logging = () => {} // 默认是console.log
}

// 线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池的最大连接数
        min: 0, // 连接池的最小连接数
        idle: 1000, // 如果
    }
}

// 创建连接
const seq = new Sequelize(database, user, password, conf)

module.exports = seq
