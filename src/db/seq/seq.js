const Sequelize = require('sequelize');
const { mysqlConfig } = require('../../config/envs/dev');
const { isProd, isTest } = require('../../utils/env');

// 连接配置
const { database, user, password, host, port, timezone } = mysqlConfig;
const conf = {
    host,
    port,
    dialect: 'mysql',
    timezone,
    // 解决时区问题
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    }
};

// 测试环境不打印日志
if (isTest) {
    conf.logging = () => {}; // 默认是console.log
}

// 线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池的最大连接数
        min: 0, // 连接池的最小连接数
        idle: 1000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    };
}

// 创建连接
const seq = new Sequelize(database, user, password, conf);

module.exports = seq;
