const Router = require('koa-router')
const User = require('../controllers/user')
const { isBearerAuthenticated, isLocalAuthenticated } = require('../lib/auth')

const router = new Router()

router.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.error(error)
        ctx.status = 400
        ctx.body = {
            code: error.code,
            message: error.message || error.errmsg || error.msg || 'unknown_error',
            error
        }
    }
})

// 初始化用户数据
User.seed()

// Auth
router.post('/auth', isLocalAuthenticated(), User.signToken)
router.get('/auth', isBearerAuthenticated(), User.getUserByToken)

module.exports = router.routes()