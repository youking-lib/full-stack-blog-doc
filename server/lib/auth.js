const passport =  require('koa-passport')
const LocalStrategy =  require('passport-local')
const BearerStrategy =  require('passport-http-bearer')
const UserModel = require('../models/user')
const AccessToken =  require('../models/accessToken')

// serialize user objects into the session
passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser(async (username, done) => {
    const user = await UserModel.findOne({username})
    done(null, user)
})

passport.use(new BearerStrategy(async (token, done) => {
    try {
        const accessToken = await AccessToken.findOne({token}).populate('user')
        accessToken ? done(null, accessToken.user) : done(null, false, {type: 'error', message: '授权失败！'})
    } catch (err) {
        done(err)
    }
}))

/**
 * 默认从 req.body 或者 req.query 中取出 username, password 字段
 * https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js#L49
 */
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UserModel.findOne({username})
        if (user && user.validPassword(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    } catch (err) {
        done(err)
    }
}))

exports.isBearerAuthenticated = function () {
    return passport.authenticate('bearer', {session: false})
}

exports.isLocalAuthenticated = function () {
    return passport.authenticate('local', {session: false})
}

exports.passport = passport