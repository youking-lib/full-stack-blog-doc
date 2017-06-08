import koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import kcors from 'kcors'
import routes from './routes'
// import passport from './lib/auth'


const app = new koa()
app.use(logger())
app.use(kcors())
app.use(bodyParser())
app.use(routes)

module.exports = app