const router = require('koa-router')();

// 中间件
const loginCheck = require('../middlewares/loginCheck');
const genValidator = require('../middlewares/genValidator');
const { workInfoSchema } = require('../validator/works');
const { createWorks, copyWorks } = require('../controller/works/createWorks');
const { findOneWork, findMyWorks } = require('../controller/works/findWork');
const { updateWorks, transferWorks } = require('../controller/works/updateWorks');
const { deleteWork, putBackWork } = require('../controller/works/deleteWorks');

// 路由前缀
router.prefix('/api/works');

// 创建空白作品
router.post('/', loginCheck, genValidator(workInfoSchema), async (ctx) => {
    const { userName } = ctx.userInfo;
    const { title, desc, content = {} } = ctx.request.body;
    const res = await createWorks(userName, { title, desc }, content);
    ctx.body = res;
});

// 查询单个作品
router.get('/:id', loginCheck, async (ctx) => {
    const { id } = ctx.params;
    const { userName } = ctx.userInfo;

    const res = await findOneWork(id, userName);
    ctx.body = res;
});

// 修改作品数据
router.patch('/:id', loginCheck, async (ctx) => {
    const { id } = ctx.params;
    const { userName } = ctx.userInfo;
    const res = await updateWorks(id, userName, ctx.request.body);
    ctx.body = res;
});

// 复制作品数据
router.post('/copy/:id', loginCheck, async (ctx) => {
    const { userName } = ctx.userInfo;
    const { id } = ctx.params;
    const res = await copyWorks(id, userName);
    ctx.body = res;
});

// 删除作品数据
router.delete('/:id', loginCheck, async (ctx) => {
    const { id } = ctx.params;
    const { userName } = ctx.userInfo;
    const res = await deleteWork(id, userName);
    ctx.body = res;
});

// 恢复删除作品
router.post('/put-back/:id', loginCheck, async (ctx) => {
    const { id } = ctx.params;
    const { userName } = ctx.userInfo;
    const res = await putBackWork(id, userName);
    ctx.body = res;
});

// 转赠作品
router.post('/transfer/:id/:receiver', loginCheck, async (ctx) => {
    console.log(ctx.params);
    const { id, receiver } = ctx.params;
    const { userName } = ctx.userInfo;
    const res = await transferWorks(id, userName, receiver);

    ctx.body = res;
});

// 获取我的作品或者模板
router.get('/', loginCheck, async (ctx) => {
    const { pageIndex, isTemplate = '0', pageSize, title, status } = ctx.query;
    const { userName } = ctx.userInfo;
    const res = await findMyWorks(userName, { isTemplate, title, status }, { pageIndex, pageSize });
    ctx.body = res;
});

module.exports = router;
