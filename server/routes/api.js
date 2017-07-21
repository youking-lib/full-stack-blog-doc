const Router = require('koa-router')
const { isBearerAuthenticated, isLocalAuthenticated } = require('../lib/auth')
const User = require('../controllers/user')
const Keyword = require('../controllers/keyword')
const Article = require('../controllers/article')
const Archive = require('../controllers/archive')

const router = new Router()

router.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.error(error)
        ctx.status = ctx.status || 400
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

// Keyword
router.get('/keyword', Keyword.query)
router.post('/keyword', isBearerAuthenticated(), User.requireSuperAdmin, Keyword.create)
router.delete('/keyword/:_id', isBearerAuthenticated(), User.requireSuperAdmin, Keyword.del)

// Article
router.get('/article', Article.query)
router.get('/article/:_id', Article.getDetail)
router.post('/article', isBearerAuthenticated(), User.requireSuperAdmin, Article.create)
router.delete('/article/:_id', isBearerAuthenticated(), User.requireSuperAdmin, Article.del)

// Archive
router.get('/archive', Archive.query)

module.exports = router.routes()
