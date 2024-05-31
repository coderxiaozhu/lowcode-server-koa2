const appConf = require('./pm2AppConf');

// 为了方便测试, pm2进程设置为1
appConf.instances = 1;

module.exports = {
    apps: [appConf]
};
