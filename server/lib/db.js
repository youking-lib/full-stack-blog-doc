import mongoose from 'mongoose'

// 连接数据库
export function connect (config) {
    return new Promise((resolve, reject) => {

        mongoose.connection
            .on('error', err => reject(err))
            .on('close', () => console.log('MongoDB connection closed! '))
            .on('open', () => resolve(mongoose.connections[0]))

        mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, config.options)
    })
}