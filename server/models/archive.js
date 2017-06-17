var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var AchiveSchema = new Schema({
    records: [{
        title: {
            type: String,
            required: true
        },
        quoteId: {
            type: Schema.ObjectId,
            ref: 'Articles',
        }
    }],
    date: {
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('Archive', AchiveSchema)