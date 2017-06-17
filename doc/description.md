不会后端的前端，不会写单页面应用...

单页面应用的概念已经被提出很长时间了，无论是基于 vue, angular 还是 react，相信大家或是耳濡目染，或是设身处地都有所体会。说到底，当自己独自开发从搭建开发环境，到前端的每一个组件，到动作交互，再到和后端的数据交互，难免遇到不少问题。在这个过程中，值得记录每一个需要学习、分享的知识点。

> 如果还没有自己实现过一个单页应用，那可以参考我的一起 [交流学习](https://github.com/whistleyz/full-stack-blog-doc)
> 如果已经轻车熟路，欢迎给我 [挑毛病](https://github.com/whistleyz/myblog-express/issues)

### SITUATION

初衷也就是上面所提到的，综合自己所学的知识，打通前后端。不过结果让人欣喜让人忧。当初以为自己会个 react， 写个应用就不得了。当把自己作为一个伪全栈工程师去踩一个个的坑时，恍然发现路漫漫其修远。

### TASK

作为一个前端，不满足于使用 hexo 来生成自己的博客 = =，至少该是 [Gatsby](https://github.com/gatsbyjs/gatsby) 。那就可以开发一个让自己赏心悦目的博客系统。

### ACTION

#### 搭建开发环境

前端基于 react 、antd、dva等 react 生态圈等框架，构建工具首选必然是 webpack。相信使用脚手架来开发的时候，遇到了问题，还是需要扒一扒源代码，我们不如自己来搭建开发环境，以熟悉 webpack 的每个配置。

- [【单页面博客从前端到后端】环境搭建](https://segmentfault.com/a/1190000009676087)

#### 引入 Dva + Antd 实现前端交互

- [【单页面博客从前端到后端】基于 DVA+ANTD 搭建博客前后台界面](https://segmentfault.com/a/1190000009712370)

#### 基于 koa@2 + mongodb + passport 来实现后端逻辑

如果后端只是简单的增删改查，那有违我们的初衷。要实现基本的 Auth2.0 权限认证，还要进行基本的业务逻辑和数据层分离等。

- [【单页面博客从前端到后端】基于 Passport 和 Koa@2 的权限验证与 DVA 的 Model 设计](https://segmentfault.com/a/1190000009749208)

#### 引入 Draftjs 来实现富文本编辑器

Draft.js 是 Facebook 开源的用于构建富文本编辑器的 JavaScript 框架。你可以用它实现像 Bear 笔记那样的 web 端编辑器，极力推荐。

### RESULT

一开始后端我用的是 express，如果还不熟悉 nodejs 框架的朋友可以参考这个 [github仓库](https://github.com/whistleyz/myblog-express)，上手 express。之后我用了 koa 重构了整个项目，在用 async 函数梳理异步流时，窃喜。
在写下这篇文章过程中，突然发现自己的这个项目已经有两颗星星了，很高兴！这几天的疲惫全无！

项目我已经部署上线，查看 [演示地址](http://codingbro.cn)
测试账号：`{username: 'test', password: 'test'}`

### 预期计划

1. 前后端同构，服务端渲染
2. 引入 flow 来对 js 做静态类型的检查
3. 加入测试代码
4. 完善文档

### 最后

欢迎来 star, pr, issues…