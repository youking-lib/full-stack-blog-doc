const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    output: {
        publicPath: '/'
    },
    stats: "errors-only",
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true
        })
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        proxy: {
            "/api/v1": "http://localhost:8082"
        }
    }
}