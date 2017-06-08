import Router from 'koa-router'

const router = new Router({prefix: '/api/v1'})
router.get('/', async ctx => ctx.body = 'Hello world!')

export default router.routes()