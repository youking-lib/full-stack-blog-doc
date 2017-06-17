const Router = require('koa-router')
const { promisify } = require('util')
const path = require('path')
const Api = require('./api')
const readFile = promisify(require('fs').readFile)
// const { readFile } = require('../utils')
const router = new Router()

// Index
router.get('/', async ctx => {
    const result = await readFile(path.resolve(__dirname, '../public/assets/index.html'))
    console.log(result)
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = result
})
// Restful Api
router.use('/api/v1', Api)


module.exports = router.routes()