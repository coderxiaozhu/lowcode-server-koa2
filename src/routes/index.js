const router = require('koa-router')()
const packageInfo = require("../../package.json")
const testMysqlConn = require("../db/mysql2")
const ENV = require("../utils/env")

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/api/db-check', async (ctx) => {
  const mysqlRes = await testMysqlConn()
  ctx.body = {
    errno: 0,
    data: {
      name: 'lowcode-server',
      version: packageInfo.version,
      ENV,
      mysqlConn: mysqlRes.length > 0
    }
  }
})

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
