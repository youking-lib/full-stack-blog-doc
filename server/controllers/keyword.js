const KeywordModel = require('../models/keyword')

exports.query = async function (ctx) {
    const _query = ctx.query
    const result = await KeywordModel.find(_query).lean()
    console.log(result)
    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}

exports.create = async function (ctx) {
    const result = await KeywordModel.create(ctx.request.body)
    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}

exports.del = async function (ctx) {
    const _id = ctx.params._id
    const res = await KeywordModel.findByIdAndRemove(_id)
    ctx.status = 200
    ctx.body = {
        success: true
    }
}