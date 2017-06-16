const UserModel = require('../models/user')
const TokenModel = require('../models/accessToken')
const { genHash } = require('../utils')
const config = require('../config')
const { ADMIN_MIN_LEVEL, SUPERADMIN_MIN_LEVEL } = config.CONSTANTS

exports.signToken = async function (ctx, next) {
    const { user } = ctx.req
    await TokenModel.findOneAndRemove({user: user._id})
    const result = await TokenModel.create({
        token: genHash(user.username + Date.now()),
        user: user._id
    })

    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}

exports.getUserByToken = async function (ctx, next) {
    ctx.status = 200
    ctx.body = {
        success: true,
        data: ctx.req.user
    }
}

// 初始化超级管理员
exports.seed = async function (ctx, next) {
    const users = await UserModel.find({})
    const adminInfo = config.admin
    if (users.length === 0) {
        const _admin = new UserModel(adminInfo)
        const adminUser = await _admin.save()
    }
}

exports.requireAdmin = async function (ctx, next) {
    const { user } = ctx.req
    if (user.level >= ADMIN_MIN_LEVEL) {
        return next()
    }
    ctx.status = 401
    ctx.body = {
        error: {
            message: '需要管理员权限哦！'
        }
    }
}

exports.requireSuperAdmin = async function (ctx, next) {
    const { user } = ctx.req
    if (user.level >= SUPERADMIN_MIN_LEVEL) {
        return next()
    }
    ctx.status = 401
    ctx.body = {
        error: {
            message: '需要超级管理员权限哦！'
        }
    }
}
