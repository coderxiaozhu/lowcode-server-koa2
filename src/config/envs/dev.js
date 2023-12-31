module.exports = {
    // mysql配置
    mysqlConfig: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'lowcode_db',
        timezone: '+08:00'
    },
    // mongodb配置
    mongodbConf: {
        host: 'localhost',
        port: '27017',
        dbName: 'lowcode_works'
    },
    // redis配置
    redisConf: {
        port: '6379',
        host: '127.0.0.1',
        password: '123456'
    },
    // jwt过期时间
    jwtExpiresIn: '1d', // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s

    // cors origin
    corsOrigin: '*',

    // 短信验证码缓存时间,单位 s
    msgVeriCodeTimeout: 2 * 60
};
