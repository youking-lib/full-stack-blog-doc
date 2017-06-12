const crypto = require('crypto')

exports.genHash = function (value) {
    if (typeof value === 'string') {
        return crypto.createHash('md5').update(value).digest('hex')
    }
}