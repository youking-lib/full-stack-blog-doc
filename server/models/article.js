const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        blocks: Array,
        entityMap: {
            type: Object,
            default: {}
        }
    },
    author: {
        type: String,
        ref: 'Users',
        default: 'whistleyz'
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },
    keywords: [{
        type: ObjectId,
        ref: 'Keywords',
        default: ''
    }]
})

ArticleSchema.pre('save', next => {
    this.meta = {}
    this.meta.createAt = this.meta.updateAt = Date.now()
    next()
})

ArticleSchema.pre('findOneAndUpdate', next => {
    this.meta = this.meta || {}
    this.meta.updateAt = Date.now()
    next()
})

module.exports = mongoose.model('Articles', ArticleSchema)