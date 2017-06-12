const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const { genHash } = require('../utils')

mongoose.Promise = Promise

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        default: ''
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    // > 50 超级管理
    // > 10 测试账号
    // < 1 黑名单
    level: {
        type: Number,
        default: 1
    }
})

UserSchema.methods.validPassword = function(password){
    return genHash(password) === this.password
}

UserSchema.pre('save', function(next){
    this.password = genHash(this.password)
    next()
})

module.exports = mongoose.model('Users', UserSchema)