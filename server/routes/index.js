const Router = require('koa-router')
const Api = require('./api')

const router = new Router()

// Index
router.get('/', async ctx => {
    ctx.body = 'Hello world!'
})
// Restful Api
router.use('/api/v1', Api)


module.exports = router.routes()