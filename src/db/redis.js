const redis = require('redis');
const { redisConf } = require('../config/index');

const { port, host, password } = redisConf;
const opt = {};
if (password) {
    opt.password = password; // prd环境需要密码
}
const redisClient = redis.createClient(port, host, opt);
redisClient.on('error', (err) => {
    console.error('redis connect error', err);
});
// 运行 node src/db/redis.js 进行测试连接
redisClient.on('connect', () => {
    console.log('redis connect success');
});

module.exports = redisClient;
