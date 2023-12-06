const router = require('koa-router')();
const packageInfo = require('../../package.json');
const testMysqlConn = require('../db/mysql2');
const ENV = require('../utils/env');
// const WorkModel = require("../models/WorksModel")
const WorkModel = require('../models/WorksModel');
const { cacheGet, cacheSet } = require('../cache/index');

router.get('/', async (ctx) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    });
});

router.get('/api/db-check', async (ctx) => {
    // 测试 mysql 数据库连接
    const mysqlRes = await testMysqlConn();

    // 测试 mongodb 数据库连接
    let mongodbConn = false;
    try {
        mongodbConn = true;
        await WorkModel.findOne();
    } catch (err) {
        mongodbConn = false;
    }

    // 测试 redis 数据库连接
    cacheSet('name', 'coderxiaozhu');
    const redisValue = await cacheGet('name');

    ctx.body = {
        errno: 0,
        data: {
            name: 'lowcode-server',
            version: packageInfo.version,
            ENV,
            mysqlConn: mysqlRes.length > 0,
            mongodbConn,
            redisConn: redisValue !== null
        }
    };
});

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router;
