const { findPublicTemplates, fineOneTemplate } = require('../controller/works/findTemplate');

const router = require('koa-router')();

// 路由前缀
router.prefix('/api/templates');

// 获取公共模板
router.get('/', async (ctx) => {
    const { title, pageIndex, pageSize } = ctx.query;
    const res = await findPublicTemplates({ title }, { pageIndex, pageSize });
    ctx.body = res;
});

// 获取单个模板信息
router.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    const res = await fineOneTemplate(id);
    ctx.body = res;
});

module.exports = router;
