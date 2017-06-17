const koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const kcors = require('kcors')
const path = require('path')
const static = require('koa-static-cache')
const routes = require('./routes')
const passport = require('./lib/auth').passport

const app = new koa()

app.use(logger())
app.use(kcors())
app.use(bodyParser())
app.use(static(path.join(__dirname, './public'), {
    prefix: '/public',
    maxAge: 365 * 24 * 60 * 60
}))
app.use(passport.initialize())
app.use(routes)

module.exports = app