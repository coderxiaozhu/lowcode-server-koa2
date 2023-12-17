/**
 * res 错误信息配置 validate
 */

// errno: 1100x

module.exports = {
    // ctx.request.body 格式校验失败
    validateFailInfo: {
        errno: 11001,
        message: '输入数据的格式错误'
    }
};
