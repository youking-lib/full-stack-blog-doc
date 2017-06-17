const crypto = require('crypto')
const fs = require('fs')

exports.genHash = function (value) {
    if (typeof value === 'string') {
        return crypto.createHash('md5').update(value).digest('hex')
    }
}

exports.readFile = function(path, options) {
    const chunks = []
    let size = 0
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(path, options)

        readStream.on('data', chunk => {
            console.log(size)
            chunks.push[chunk]
            size += chunk.length
        })

        readStream.on('end', () => {
            const buffer = Buffer.concat(chunks, size);
            resolve(buffer)
        })
        
        readStream.on('error', (err) => {
            reject(err)
        })

    })
}