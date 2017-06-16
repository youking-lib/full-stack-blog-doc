const mongoose = require('mongoose')

const KeywordSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    des: String,
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'articles'
    }],
    status: {
        type: Number,
        default: 1,
    }
})

module.exports = mongoose.model('Keywords', KeywordSchema)