const webpackMerge = require('webpack-merge')
const baseConfig = require('./base')
const devConfig = require('./dev')
const prodConfig = require('./prod')

const dev = webpackMerge(baseConfig, devConfig)
const prod = webpackMerge(baseConfig, prodConfig)

module.exports = process.env.NODE_ENV === 'production' ? prod : dev