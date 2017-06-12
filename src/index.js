import dva from 'dva'

const app = dva()

app.model(require('./model/app'))
app.router(require('./router'))
app.start('#root')