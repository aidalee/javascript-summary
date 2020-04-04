# 基本配置

## 拆分配置和 merge

> 分别定义 common、dev、prod 配置文件,把 common 文件使用 merge 插件分别 merge 到 dev 和 prod

## 启动本地服务

> webpack-dev-server 插件，设置代理等

## 处理 es6

> 在 common 文件 中使用 babel-loader 对 src 下的 js 类 文件做处理；同时配置.babelrc 文件

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

```
optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

    // 分割代码块
    splitChunks: {
        chunks: 'all',
        /**
            * initial 入口 chunk，对于异步导入的文件不处理
            async 异步 chunk，只对异步导入的文件处理
            all 全部 chunk
            */

        // 缓存分组
        cacheGroups: {
            // 第三方模块
            vendor: {
                name: 'vendor', // chunk 名称
                priority: 1, // 权限更高，优先抽离，重要！！！
                test: /node_modules/,
                minSize: 0,  // 大小限制
                minChunks: 1  // 最少复用过几次
            },

            // 公共的模块
            common: {
                name: 'common', // chunk 名称
                priority: 0, // 优先级
                minSize: 0,  // 公共模块的大小限制
                minChunks: 2  // 公共模块最少复用过几次
            }
        }
    }
}
```

## webpack 如何实现 异步加载 js

```
setTimeout(()=>{
    <!-- 回顾类似vue react异步组件 -->
    import('./dynamic-data.js').then(res=>{
        console.log(res.default.message)
    })
    <!-- import支持promise -->
},1500)
```

## 处理 JSX

> 安装 @babel/preset-react

## 处理 vue

> vue-loader

## module chunk bundle 的区别

- module:各个源码文件，webpack 中一切皆模块
- chunk:多个模块合并成的，如 entry import() splitChunk
- bundle:最终的输出文件

## webpack 优化构建速度（大厂必考社区热议话题：并不难）

- 优化打包构建速度-开发体验和效率

  1. 优化 babel-loader ——可用于生产环境

  ```
  {
      test:/\.js$/,
      use:['babel-loader?cacheDirectory'],//开启缓存
      include:path.resolve(__dirname,'src'),//明确范围
      <!-- exclude:path.resolve(__dirname,'node_modules')排除范围，两者选一个即可 -->

  }
  ```

  2. 用 IgnorePlugin 忽略无用模块——可用于生产环境
     > 如：import moment from 'moment',默认引入所有语言 JS 代码，代码量过大，如何只引入中文

  ```
  <!-- index.js -->
  import moment from 'moment'
  import 'moment/locale/zh-cn' // 手动引入中文语言包
  moment.locale('zh-cn')
  <!-- webpack.prod.js 忽略moment下的/locale目录-->
  new webpack.IgnorePlugin(/\.\/locale/,/moment/)
  ```

  3. noParse 避免重复打包——可用于生产环境

  ```
  <!-- 对xxx.min.js类型的文件不进行打包 -->
  module.exports = {
      module:{
          noParse:[/react\.min\.js$/]
      }
  }
  ```

  > IgnorePlugin VS noParse: IgnorePlugin 是直接不引入，代码中没有，noParse 是引入了但不打包（不进行 babel 编译以及模块化分析等）

  4. happyPack 多进程打包 ——可用于生产环境
     > JS 是单线程的，使用 happyPack 插件 开启多进程打包，提高构建速度，特别是多核 CPU。
  5. parallelUglifyPlugin 多进程压缩 js——一般只用于生产环境不会用于开发环境
     > webpack 内置 Uglify 工具压缩 JS,JS 单线程，开启多进程压缩更快和 happyPack 同理
     > 项目较大，打包较慢，开启多进程能提高速度，项目较小，打包很快，开启多进程会降低速度（进程开销）。所以要按需使用。
  6. 自动刷新————不用于生产环境
     > 保存代码页面自动更新，dev 中配置 watchOptions 即可，prod 不需要。
  7. 热更新 dev 环境下，插件：HotModuleReplacementPlugin————不用于生产环境
     > 自动刷新是整个网页全部刷新，速度较慢；自动刷新状态会丢失；
     > 热更新：新代码生效，网页不刷新，状态不丢失
     > 热更新的代价是需要在开发中自行配置哪些模块是需要热更新的,如自动刷新可满足开发需求则不需要加热更新功能

  ```
  <!-- 如在index.js中 -->
  if(module.hot) {
      module.hot.accept(['./math'],()=>{
          const sumRes=sum(10,30)
          console.log("....")
      })
  }
  ```

  8. DllPlugin 动态链接库插件 只在开发环境中使用————不用于生产环境
     > 应用场景：前端框架如 vue react 体积大构建慢；较稳定，不常升级；同一个版本之构建一次即可，不用每次都重新构建
     > webpack 已内置 Dllplugin 支持，Dllplugin——打包出 dll 文件，DllReferenceplugin——使用 dll 文件

- 优化产出代码-产品性能
  > 作用：使打包体积更小；合理分包，不重复加载；速度更快，内存使用更少
  1. 小图片 base64 编码
  2. bundle 加 hash
     ```
      output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
     }
     ```
  3. 不太重要的大文件懒加载
  4. 提取公共代码分别打包
  5. IngorePlugin 忽略一些文件
  6. 使用 cdn 加速
  7. 使用 mode:production,可以开启自动代码压缩，dev 环境下没有必要压缩代码；压缩代码时可以考虑使用 parallelUglifyPlugin 开启多进程压缩；使用 production 会自动启用 tree-shaking(生产环境下将没有使用的方法等删掉)
     > es6 Module 和 Commonjs 区别：es6 module 静态引入，编译时引入；commonjs 动态引入，执行时引入，只有前者才能静态分析实现 tree-shaking
  8. Scope Hosting 将多个文件引入的多个函数整合到一个函数中，减少作用域数量，减少内存占用。也使得代码体积更小，提高一些执行效率。方法：引入插件。

## babel

- 环境搭建 基本配置

  1.  基本插件安装： "@babel/cli": "^7.7.5","@babel/core": "^7.7.5","@babel/preset-env": "^7.7.5"
      ```
      {
        "presets": [
            [
                "@babel/preset-env", // 相当于在 plugins 中配置了基本的编译 es6、es7 等的插件，常用的有@babel/preset-env，@babel/preset-flow,@babel/preset-react,@babel/preset-typescript
                {
                "useBuiltIns": "usage",按需引入
                "corejs": 3
                }
            ]
        ],
        "plugins": [
            // 在 plugins 中扩展 presets 基本配置无法满足的插件配置
            [
                "@babel/plugin-transform-runtime",
                {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true, // 用于支持generator语法
                "useESModules": false
                }
            ]
        ]
      }
      ```

2.  babel-polyfill 是 core-js 和 regenerator 的集合
    > polyfill 即补丁，早年对于数组等一些在低版本浏览器不支持的 api 等，做一个补丁（兼容）
    > core-js 所有新语法的所有函数的兼容性写法的集合如 promise symbol 等
    > babel 7.4 之后弃用 babel-polyfill，推荐直接使用 core-js 和 regenerator
    > babel-polyfill 文件较大，可以按需引入"useBuiltIns": "usage", "corejs": 3(版本号)
3.  babel-runtime(按需使用)
    > 使用 babel-polyfill 容易污染全局环境，因此要用到 babel-runtime 来避免；
    > 需要安装的插件："@babel/plugin-transform-runtime": "^7.7.5"（devDependcies）,"@babel/runtime": "^7.7.5"(dependcies),做如下配置
    ```
    [
        "@babel/plugin-transform-runtime",
        {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true, // 用于支持generator语法
        "useESModules": false
        }
    ]
    ```
