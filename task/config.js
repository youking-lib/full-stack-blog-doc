const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const runsack = require('rucksack-css')

const theme = require('../theme.js')()

const postcssPlugins = () => [
    runsack(),
    autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
]

const base = {
    context: path.resolve(__dirname, '..'),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/assets/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                exclude: [ /node_modules/ ],
                use: [
                    'react-hot-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react', 'stage-0'],
                            plugins: [
                                "add-module-exports",
                                "transform-runtime",
                                ["import", { "libraryName": "antd", "style": true }]
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.module\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        {
                            loader: 'css-loader', 
                            options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]'} 
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: postcssPlugins
                            }
                        },
                        {
                            loader: 'less-loader', 
                            options: {"modifyVars": theme}
                        }
                    ]
                })
            },
            {
                test: function(path){
                    return /\.less$/.test(path) && !/\.module\.less$/.test(path)
                },
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        {
                            loader: 'css-loader', 
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: postcssPlugins
                            }
                        },
                        {
                            loader: 'less-loader', 
                            options: {"modifyVars": theme}
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, '../src/components')
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name]-[hash].css'
        }),
    ]
}

const dev = webpackMerge(base, {
    output: {
        publicPath: '/'
    },
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
})

const prod = webpackMerge(base, {

})

module.exports = process.env.NODE_ENV === 'production' ? prod : dev