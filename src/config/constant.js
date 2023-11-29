module.exports = {
    // jwt密钥
    JWT_SECRET: 'coderxiaozhu',
    // jwt忽略默认验证的path: 全部忽略即可，需要登录验证的，使用封装好的函数
    JWT_IGNORE_PATH: [/\//]
}