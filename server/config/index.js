const base = {
    admin: {
        username: 'whistleyz',
        password: 'admin123',
        email: 'whistleyz@163.com',
        level: 50  // 超管
    },
    CONSTANTS: {
        ADMIN_MIN_LEVEL: 10,      // 管理员 level
        SUPERADMIN_MIN_LEVEL: 50  // 超级管理员 level
    }
}

const dev = Object.assign(base, {
    db: {
        host: '127.0.0.1',
        port: 27017,
        database: 'fullblog',
        options: {
            user: '',
            pass: ''
        }
    }
})

const prod = Object.assign(base, {

})

const env = process.env.NODE_ENV || 'development'
const _config = {
    development: dev,
    production: prod
}

// 数据库配置
module.exports = _config[env]