const router = require('koa-router')();

const loginCheck = require('../middlewares/loginCheck');
const genValidator = require('../middlewares/genValidator');
const channelSchema = require('../validator/channel');
const { createChannel, deleteChannel, getWorkChannels, updateChannelName } = require('../controller/channel');

// 路由前缀
router.prefix('/api/channel');

// 创建渠道
router.post('/', loginCheck, genValidator(channelSchema), async (ctx) => {
    ctx.body = await createChannel(ctx.request.body);
});

// 删除渠道
router.delete('/:id', loginCheck, async (ctx) => {
    const { id } = ctx.params;
    ctx.body = await deleteChannel(id);
});

// 更新渠道名称
router.patch('/updateName/:id', loginCheck, genValidator(channelSchema), async (ctx) => {
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    ctx.body = await updateChannelName(id, name);
});

// 根据一个作品的所有渠道
router.get('/getWorkChannels/:workId', loginCheck, async (ctx) => {
    const { workId } = ctx.params;
    ctx.body = await getWorkChannels(workId);
});

module.exports = router;
