# 【单页面博客从前端到后端】环境搭建

工欲善其事，必先利其器。单页面应用的开发和生产环境涉及文件的编译、压缩、打包、合并等，目前前端最流行的莫过于 `webpack` 。为了深入了解 `webpack`  以及其相关插件，我们决定不采用脚手架，自己来搭建基于 `webpack` 的开发和生产环境。

### 基础环境

nodejs的安装： [移步官网](https://nodejs.org/en/download/)
> 建议使用nvm来管理nodejs的版本
> [安装nvm](https://github.com/creationix/nvm/blob/master/README.md) 

### Webpack相关plugin、loader的介绍

我们使用的是 `webpack@2.X.X` ，建议读完 [官方文档](https://webpack.js.org/configuration/) 对她有个大概的了解。

- **webpack-dev-server** 用 `webpack-dev-server` 来进行开发环境下面的自动打包编译，包括热更新等等。当然也可以自己通过 `webpack-dev-middleware` 来自定义一个开发服务器。具体可以参考 `webpack-dev-server` 的源代码。
- **webpack-hot-middleware**  向入口文件中添加一个 `client ` 文件，当文件变化时，服务器端可以通过 `socket` 事件来通知这个 `client` 来实现热更新。注：这个事件是 [EventSource事件](https://www.html5rocks.com/en/tutorials/eventsource/basics/)。  `webpack-dev-server` 已经将这个中间件封装到内部，我们只需要进行配置即可。
- **babel-loader** 编译 `es6` 代码。[移步官网](http://babeljs.io/docs)。值得一提的是 `es2016`, `es2017`, `env` 等是对已经或者将要被加入 JS这门语言的提案进行预编译，而 `stage-0` , `stage-1` , `stage-2` 等是对将来可能加入立案里面的语法的预编译。
- **extract-text-webpack-plugin** 样式文件默认会被 webpack 打包到js文件中。这个插件可以提取出这些被打包进入的文件。

当然我们用到的不只是这些，你可以到npm官网或者github上面找到这些plugin、loader的详细用法

### 初始目录结构

```sh
blog 
├─ dist           # 输出目录
├─ task           # 这里来放webpack处理和配置文件
├─ src
|  ├─ components  # 组件
|  └ index.js    # 入口文件
| package.json
```

### 跑通开发环境

在 `src/` 目录下新建入口文件 `index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom'
// 这里需要借助 webpack 的同名功能来代替繁琐的相对路径
import HomeComponent from 'components/Home'

ReactDOM.render(<HomeComponent />, document.getElementById('root'))
```

在 `src/component/` 目录下新建 `Home.js` 模块

```js
import React, { Component } from 'react'

export default class Home extends Component {
    render(){
        return <div>Hello world!</div>
    }
}
```

在 `src/` 目录下新建 `index.html` 文件来作为单页面的HTML文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>blog</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

现在我们来添加 `webpack ` 的配置文件来对这些文件进行打包、编译

在 `task/` 目录下新建 `config.js` 文件

```js
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const base = {
    // 上下文环境，相对路径都基于这个路径
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
                            presets: ['env', 'react'],
                            plugins: [
                                "add-module-exports",
                                "transform-runtime"
                            ]
                        }
                    }
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // 这里对应着入口文件中 component 的同名配置
            components: path.resolve(__dirname, '../src/components')
        }
    }
}

const dev = webpackMerge(base, {
    output: {
        publicPath: '/'
    },
    // 源文件的 source map
    devtool: "source-map",
    plugins: [
          new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            
            template: './src/index.html',
            filename: 'index.html',
            inject: true
        })
    ],
    devServer: {
          // 开启热加载，需要 hmr 的支持
        hot: true,
        contentBase: path.resolve(__dirname, '../dist'),
          // 这个路径一定要和 output 的 publicPath 的属性一致
        publicPath: '/',
    }
})

const prod = webpackMerge(base, {

})

// 根据 NODE_ENV 来决定输出的配置
module.exports = process.env.NODE_ENV === 'production' ? prod : dev
```

在项目跟路径下执行

 `export NODE_ENV=development && webpack-dev-server --config ./task/config.js` 

`export NODE_ENV=development` 设置 `NODE_ENV` 这个环境变量为 `development` 有助于我们区分开发环境和生产环境。这是mac下面的设置方法，windows 可以自行搜索 

编译成功，并且页面输出 `Hello world!` 表示配置跑通...
在 `package.json` 添加

```json
{
    "scripts": {
        "dev": "export NODE_ENV=development && webpack-dev-server --config ./task/config.js --progress --colors --hotOnly"
    }
}
```

### TROUBLESHOOTING

#### 通过 `webpack-merge` 来覆盖 `output.publicPath` 属性

如果 `devServer.publicPath = output.publicPath = '/assets/'` 的话，那么在浏览器中打开 `localhost:80XX/assets/index.html` 才能访问到 `index.html` 文件，而将 `publicPath = '/'` 就直接通过 `localhost:80XX` 就可以访问。

#### `loader` 的配置

其中 `include`, `exclude` 就不多说
```js
{
    use: [
        'react-hot-loader',
        {
            loader: 'babel-loader',
            options: {
                presets: ['env', 'react'],
                plugins: [
                    "add-module-exports",
                    "transform-runtime"
                ]
            }
        }
    ],
}
```

[react-hot-loader](https://github.com/gaearon/react-hot-loader) 会解决更改 react 组件的时 webpack 热更新直接刷新页面的问题。

`babel-presets-react` 用来处理 react 的 jsx 语法

[babel-plugin-add-module-exports](https://github.com/59naga/babel-plugin-add-module-exports)  `babel@6` 会将es6的语法 

```js
// home.js
export default 'foo'
```

转化为

```js
'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = 'foo';
```

所以在使用 `commonjs` 的语法 `require('./home')` 时，得到的是
`{default: 'foo'}` ，所以：

```js
var home = require('./home').default
console.log(home) // 'foo'
```

这个插件可以避免这一现象

#### [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 

这里解释一下使用 `html-webpack-plugin` 的必要性。
其实完全可以扔一个静态的 `index.html` 给 `webpack-dev-server` ，这里面只需要有个 `<script src="bundle.js"></script>` 标签，就可以成功来进行访问。但是更多的时候我们会定制打包文件的名称： `output.filename: '[name]-[hash].js'` ，编译之后 `webpack` 会输出一个类似于这样的文件 `bundle-fb9758acf17b2b5fb653.js` ，那么你每次打包都需要去更改那个src属性，而 `html-webpack-plugin` 可以帮你解决这些事情

### 添加对样式文件的支持

在 `src/component/` 下新建 `Home.module.less`

```css
@color: green;

:global {
    body {
        background-color: red;
    }
}

.wrap {
    color: @color;
}
```

在同级目录下的 `Home.js` 组件中引入这个 less 文件

```js
import React, { Component } from 'react'
import Style from './home.module.less'

export default class Home extends Component {
    render(){
        return <div className={Style.wrap}>Hello world!</div>
    }
}
```

我们没有在 `task/config.js` 下增加对 `less` 文件的支持，肯定会报错的。先说一下为什么要以 `.module.less` 标识 `less` 文件，只会我们会引入 `babel-plugin-import` 对样式库 `antd` 进行按需加载，由于 `antd` 源代码中的样式文件也是用 `less` 写的，这样会导致这些文件被作为 `css-module` 处理，所以加以区别，这是参考 [atool-build](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js#L139) 的配置。

在 `task/config.js` 文件新增 :

``` js
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const runsack = require('rucksack-css')
const theme = require('../theme.js')()
const postcssPlugins = () => [
    runsack(),  // 可选
    autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
]
// 在base.module.rules里增加
{
    test: /\.module\.less$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',  // 将下面处理过的文件插入html中
        use: [
            {
                loader: 'css-loader', 
                // 开启对css-module的支持，并定义className的输出格式
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
                // 覆盖默认的全局配置
                options: {"modifyVars": theme}
            }
        ]
    })
},
// 在 base.plugins 里增加
new ExtractTextPlugin({
    filename: 'css/[name]-[hash].css',
}),
```

其他的 loader 和 webpack plugin 就不再赘述， [移步文档](https://webpack.js.org/loaders/)

> 还要注意的是 `less-loader` 中的配置选项，`{"modifyVars": theme}` ，这可以覆盖 `less` 文件的配置，可以用来自定义样式库 `antd` ， [继续查看](https://ant.design/docs/react/customize-theme-cn)

在项目根目录下新建 `theme.js`
```js
module.exports = function(){
    return {}
}
```

别忘记安装配置文件里面用到的 loader、pulgins…   = =
安装 `less-loader` 记得把 `less` 也装上，它的文档也是有强调的哦！

### 小结
基础的环境配置就到这里。生产环境你可以自行配置，之后我会在后面的文章中列出来。
你可以在这个仓库查看 [这第一次 commit](https://github.com/whistleyz/full-stack-blog-doc/commit/ebd49795bea99805c76a08e51825e49db024999f) 哦！下面皆可以愉快的做自己的博客了！

