# 基本配置

## 拆分配置和 merge

> 分别定义 common、dev、prod 配置文件,把 common 文件使用 merge 插件分别 merge 到 dev 和 prod

## 启动本地服务

> webpack-dev-server 插件，设置代理等

## 处理 es6

> 在 common 中使用 babel-loader 对 src 下的 js 类 文件做处理；同时配置.babelrc 文件

## 处理样式

> loader 顺序是从后往前从下往上；style-loader,css-loader,postcss-loader(增加 postcss.config.js 配置文件，配置 autoprefixer);less-loader

## output 配置

> filename:'bundle.[contentHash:8].js',这里配置 hash 如果内容没变打包的时候 hash 值不变，前端页面刷新时命中缓存，提高渲染。

# 高级配置（重点）

## 多入口

> 1.common 文件配置 entry 里引入多个 js 文件；2.prod 的 output 里：filename:'[name].[contentHash:8].js';3.common 文件的 plugins 中使用多个 new HtmlWebpack({template:path.join(srcPath,'other.html'),filename:'other.html',chunks:['other']//只引用 other.js;如果不写则引入 entry 里所有的})

## 抽离压缩 css 文件

> dev 环境下把 css 放到 style 中没问题，但线上环境为了提高性能最好抽离出来

```
// 抽离 css
{
    test: /\.css$/,
    loader: [
        MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
        'css-loader',
        'postcss-loader'
    ]
},
// 抽离 less --> css
{
    test: /\.less$/,
    loader: [
        MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
        'css-loader',
        'less-loader',
        'postcss-loader'
    ]
}
plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
        // window.ENV = 'production'
        ENV: JSON.stringify('production')
    }),

    // 抽离 css 文件
    new MiniCssExtractPlugin({
        filename: 'css/main.[contentHash:8].css'
    })
],
<!-- optimization:优化 -->
optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
}
```

## 抽离公共代码和第三方代码库

> 比如在两个组件里引入了两次（import {sum} from './math'），则会打包两次 sum。如果在一个文件 index.js 里引入了第三方模块 lodash,每次修改了 index.js 文件重新打包时总要再打包 lodash,所以将 lodash 抽出来单独打包，这样只需要打包一次。
