const ArticleModel = require('../models/article')
const AchiveController = require('./archive')
const KeywordController = require('./keyword')

exports.query = async function (ctx) {
    const _query = ctx.request.query
    const result = await ArticleModel
            .find(_query)
            .populate('keywords')
            .select('-content')
            .sort('-meta.createAt')
            .lean()

    if (result.length === 0) {
        ctx.status = 404
        throw new Error('没找到！')
    }

    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}

exports.getDetail = async function(ctx) {
    const _id = ctx.params._id
    const result = await ArticleModel.findById(_id).populate('keywords').lean()
    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}

exports.del = async function (ctx) {
    const _id = ctx.params._id
    const result = await ArticleModel.findByIdAndRemove(_id)
    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}

exports.create = async function(ctx) {
    const doc = ctx.request.body
    const _id = doc._id
    let result, prevArticle = null

    if (_id) {
        prevArticle = await ArticleModel.findById(_id)
        
        await ArticleModel.update({_id: _id}, doc, {upsert: true})
        result = await ArticleModel.findById(_id)
    } else {
        result = await ArticleModel.create(doc)
        const achive = await AchiveController.create(result)
    }
    console.log('result', result.toJSON())
    console.log('prevArticle', prevArticle.toJSON())
    const keyword = await KeywordController.updateArticle(result, prevArticle)

    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}
