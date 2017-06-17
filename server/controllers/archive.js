const moment = require('moment')
const ArticleModel = require('../models/article')
const ArchiveModel = require('../models/archive')

exports.query = async function (ctx) {
    const _query = ctx.request.query || {}
    const queryOptions = {
        skip: _query.skip || 0,
        limit: _query.limit || 2
    }
    delete _query.skip
    delete _query.limit

    const result = await ArchiveModel.find(_query, null, queryOptions).sort('-date')

    if (result.length === 0) {
        ctx.status = 404
        throw new Error('没有找到！')
    }

    ctx.status = 200
    ctx.body = {
        success: true,
        data: result
    }
}

/**
 * 1. 查找今天创建的记录
 * 2. 找到将文章push到这个记录中
 * 3. 没找到，重新创建一个记录
 * @param  {Object} articleDoc 文章表
 */
exports.create = async function (articleDoc) {
    const record = {
        title: articleDoc.title,
        quoteId: articleDoc._id
    }
    const today = moment().startOf('day').toISOString()

    let recordDoc = await ArchiveModel.findOne({date: {$gte: today}})
    let result = null

    if (recordDoc) {
        result = await recordDoc.update({$push: {records: record}})
    } else {
        result = await ArchiveModel.create({records: [record]})
    }

    return Promise.resolve(result)
}