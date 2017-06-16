import dva from 'dva'
import createLoading from 'dva-loading'

const app = dva()

app.use(createLoading({effects: true}))

app.model(require('./model/app'))
app.model(require('./model/keyword'))
app.model(require('./model/article'))

app.router(require('./router'))
app.start('#root')