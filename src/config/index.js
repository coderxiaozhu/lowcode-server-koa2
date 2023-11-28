const { isProd, isPrdDev } = require("../utils/env")

// 获取各个环境的不同配置文件
let fileName = 'dev.js';
if (isProd) fileName = 'prd_env.js'
if (isPrdDev) fileName = 'prd.js'

const conf = require(`./envs/${fileName}`)

module.exports = conf
