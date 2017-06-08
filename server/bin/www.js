'use strict'

require('babel-register')

import app from '../index'
import { dbConfig } from '../config'
import { connect } from '../lib/db'

const port = process.env.PORT || 8082;
const env = process.env.NODE_ENV || 'development';

(async () => {
    // 测试连接 MongoDB
    try {
        const info = await connect(dbConfig[env])
        console.log(`Success to connect to ${info.host}:${info.port}/${info.name}`)
    } catch (err) {
        console.error(err)
        process.exit()
    }

    // 开启服务进程
    try {
        app.listen(port)
        console.log(`Server is running at port ${port}`)
    } catch (err) {
        console.error(err)
    }
})()