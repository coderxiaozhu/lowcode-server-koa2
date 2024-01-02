const mongoose = require('mongoose');
const { mongodbConf } = require('../config/index');

const { host, port, dbName } = mongodbConf;

let url = `mongodb://${host}:${port}`;

mongoose.connect(`${url}/${dbName}`);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('mongoose connect error', err);
});

// 执行 node src/db/mongoose.js 测试连接
db.once('open', () => {
    console.log('mongoose connect success');
});

module.exports = mongoose;
