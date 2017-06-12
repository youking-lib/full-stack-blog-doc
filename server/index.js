const koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const kcors = require('kcors')
const routes = require('./routes')
const passport = require('./lib/auth').passport

const app = new koa()

app.use(logger())
app.use(kcors())
app.use(bodyParser())
app.use(passport.initialize())
app.use(routes)

module.exports = app