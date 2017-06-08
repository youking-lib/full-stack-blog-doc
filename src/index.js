import dva from 'dva'

const app = dva()

app.router(require('./router'))
app.start('#root')