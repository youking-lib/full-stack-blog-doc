const KeywordModel = require('../models/keyword')

exports.query = async function (ctx) {
    const _query = ctx.query
    const result = await KeywordModel.find(_query).lean()

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

exports.updateArticle = async function (newArticle, prevArticle) {
    const newKeywords = newArticle.keywords
    const articleId = newArticle._id

    let handles = []

    const setHandlers = newKeywords.map(keywordId => {
        return KeywordModel.findByIdAndUpdate(keywordId, {$addToSet: {articles: articleId}}) // $addToset 避免重复
    })

    handles = handles.concat(setHandlers)

    if (prevArticle) {
        const delKeywords = getComplement(prevArticle.keywords, newKeywords)
        const delHandlers = delKeywords.map(keywordId => {
            return KeywordModel.findByIdAndUpdate(keywordId, {$pull: {articles: articleId}})
        })    
        handles = handles.concat(delHandlers)
    }

    const res = await Promise.all(handles)
}

function getComplement (target, arr) {
    return target.filter(item => {
        return arr.indexOf(item) === -1
    })
}
