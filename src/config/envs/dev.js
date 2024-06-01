module.exports = {
    // mysql配置
    mysqlConfig: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3307',
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
        port: '6380',
        host: '127.0.0.1'
    },
    // jwt过期时间
    jwtExpiresIn: '1d', // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s

    // cors origin
    corsOrigin: '*',

    // 发布出来的 h5 域名
    h5Origin: 'http://localhost:3000',

    // 短信验证码缓存时间,单位 s
    msgVeriCodeTimeout: 20 * 60
};
