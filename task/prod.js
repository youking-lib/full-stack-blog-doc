const webpack = require('webpack')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const chalk = require('chalk')

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                ascii_only: true,
            },
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: 'css/[name]-[hash].css'
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new WebpackCleanupPlugin({quiet: true,}),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProgressPlugin((percentage, msg) => {
            const stream = process.stderr;
            if (stream.isTTY && percentage < 0.71) {
                stream.cursorTo(0);
                stream.write(`📦  ${chalk.magenta(msg)}`);
                stream.clearLine(1);
            } else if (percentage === 1) {
                console.log(chalk.green('\nwebpack: bundle build is now finished.'));
            }
        }),
    ]
}