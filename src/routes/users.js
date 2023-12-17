const router = require('koa-router')();
const loginByPhoneNumber = require('../controller/users/loginByPhoneNumber');
const sendVeriCode = require('../controller/users/sendVeriCode');
const updateUserInfo = require('../controller/users/updateUserInfo');
const genValidator = require('../middlewares/genValidator');
const loginCheck = require('../middlewares/loginCheck');
const { SuccessRes } = require('../res-model');
const { phoneNumberSchema, phoneNumberVeriCodeSchema, userInfoSchema } = require('../validator/users');

// 路由前缀
router.prefix('/api/users');

// 生成短信验证号
router.post('/genVeriCode', genValidator(phoneNumberSchema), async (ctx) => {
    const { phoneNumber, isRemoteTest } = ctx.request.body;

    // 尝试发送验证码
    const res = await sendVeriCode(phoneNumber, isRemoteTest);

    ctx.body = res;
});

// 使用手机号登录
router.post('/loginByPhoneNumber', genValidator(phoneNumberVeriCodeSchema), async (ctx) => {
    const { phoneNumber, veriCode } = ctx.request.body;
    console.log(ctx.request.body);
    const res = await loginByPhoneNumber(phoneNumber, veriCode);

    ctx.body = res;
});

// 获取用户信息
router.get('/getUserInfo', loginCheck, async (ctx) => {
    // 经过中间件, 用户信息在ctx.userInfo
    ctx.body = new SuccessRes(ctx.userInfo);
});

// 修改用户信息
router.patch('/updateUserInfo', loginCheck, genValidator(userInfoSchema), async (ctx) => {
    console.log(ctx.userInfo);
    // 经过中间件, 用户信息在ctx.userInfo
    const res = await updateUserInfo(ctx.userInfo, ctx.request.body);
    ctx.body = res;
});

module.exports = router;
