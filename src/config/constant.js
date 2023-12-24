module.exports = {
    // jwt密钥
    JWT_SECRET: 'coderxiaozhu',
    // jwt忽略默认验证的path: 全部忽略即可，需要登录验证的，使用封装好的函数
    JWT_IGNORE_PATH: [/\//],
    // 密码加密 密钥
    PASSWORD_SECRET: 'coderzhu',
    // 查询列表,默认分页配置
    DEFAULT_PAGE_SIZE: 8
};
