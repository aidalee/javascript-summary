# nodejs 介绍

- 下载&安装

1. 普通方式安装：在 nodejs 官网下载并安装即可
2. nvm 方式安装：nvm,nodejs 版本管理工具，可切换多个 nodejs 版本
   > mac os,使用 brew install nvm；windows,github 中搜索 nvm-windows，有下载地址，下载后安装
   - nvm 的使用
     1. nvm list 查看当前所有的 node 版本
     2. nvm install v10.13.0 安装指定的版本
     3. nvm use --delete-prefix 8.12.0 切换到指定的版本

- nodejs 和前端 js 的区别
  - ECMAScript
    > 只是定义了语法和词法（如：变量定义、循环、判断、函数、原型和原型链、作用域和闭包、异步。不能操作 dom,不能监听 click 事件，不能发送 Ajax 请求，不能处理 HTTP 请求，不能操作文件，即只有 es 几乎做不了任何实际项目），写 js 和 nodejs 都必须遵守。具体可参考阮一峰的 es 网站
  - javascript
    > 使用了 ECMAScript 语法规范，外加 web API（由 www3c 标准定义） ，缺一不可。web API 有 dom 操作，bom 操作，事件绑定，Ajax 等。
    > 两者结合即可完成浏览器端的任何操作
  - nodejs
    > 同前端 js，也是使用了 ECMAScript 语法规范，外加 nodejs API,缺一不可。nodejs API 包含 有处理 http,处理文件等的 API。可参考 nodejs.cn
- nodejs 使用中的 commonjs 模块化
  了解导出引入的语法

  ```
    // a.js文件
    function add (a,b){
        return a+b
    }
    function mul(a,b) {
        return a*b
    }
    // module.exports = add 单个导出
    module.exports = {
        add,
        mul
    }
    // b.js文件
    // const add = require('./a') 单个引入
    const {add,mul} = require('./a') // 多个引入
    const sum = add(10,20)
    console.log(sum)
  ```

- nodejs 使用中的 debugger 的使用
  > 在 vscode 编译器，左侧菜单栏有 debugger 工具，自行调试。。。
- server 开发和前端开发的区别
  - 分别有稳定性、cpu 性能、日志、安全性等方面

# 博客项目介绍

## 目标

1.  开发一个博客系统，具有博客的基本功能

2.  只开发 server 端，不关心前端

## 需求

1. 首页、作者主页、博客详情页
2. 登录页
3. 管理中心、新建页、编辑页

## 技术方案

### 数据如何存储

1. 博客存储（id、标题、内容、创建时间、作者）
2. 用户存储（id、用户名、密码、真实姓名）

### 如何与前端对接，即接口设计

![接口设计](./images/api.png)

# 开发接口（不用任何框架）

1. nodejs 处理 http 请求

   - http 请求概述（浏览器输入地址到页面展示的过程）:

     1. DNS 解析，（找到 IP 地址然后）建立 TCP 连接，（TCP 三次握手之后）发送 http 请求
     2. server 接收到 http 请求，处理，并返回
     3. 客户端接收到返回数据，处理数据（如渲染页面，执行 js）

   - nodejs 处理 http 请求
     1. get 请求和 querystring
        > get 请求，即客户端要向 server 端获取数据，如查询博客列表；通过 querystring 来传递数据，如 a.html?a=100&b=200；浏览器直接访问，就发送 get 请求。
     2. post 请求和 postdata
        > post 请求，即客户端要向服务端传递数据，如新建博客；通过 post data 传递数据。
     3. 路由（即接口地址）

2. 搭建开发环境
   - 从 0 开始搭建，不使用任何框架
   - 使用 nodemon 监测文件变化，自动重启 node
   - 使用 cross-env 工具设置环境变量，这个工具兼容 mac linux 和 Windows
   - 新建 app.js 和 www.js 分别写入基本服务代码和服务配置
3. 开发接口（暂不连接数据库，暂不考虑登录）
   - 初始化路由：根据之前技术方案的设计做出路由
   - 返回假数据：将路由和数据处理分离，以符合设计原则
   - 第一层 www.js， 第二层 app.js， 第三层 router 路由，第四层 controller 数据处理层（层次的拆分取决于系统复杂度，也有可能拆分出更多的层次）

# 路由和 API

- API：前端和后端、不同端（子系统）之间对接的一个术语（url（路由）`/api/blog/list`get.输入，输出）

- 路由：API 的一部分，后端系统内部的一个定义

# 数据存储

- mysql 介绍、安装和使用
  > MySQL 是企业内最常用的存储工具，一般都有专人运维，MySQL 也是社区内最常用的存储工具，有问题可以随时查资料，MySQL 本身是一个复杂的数据库软件，本项目只了解基本使用；是 web server 中最流行的关系型数据库；官网课免费下载用于学习；轻量级易学易用
  1. 执行安装
  2. 过程中需要输入 root 用户名的密码，要记住这个密码
  3. 安装 MySQL workbench，用于操作 MySQL 的客户端，可视化操作
- nodejs 连接 mysql

  1. 示例：用 demo 演示，不考虑使用

  ```
  <!-- index.js/app.js代码示例 -->
  <!-- 先安装mysql npm i mysql -->
  const mysql = require("mysql")
  // 创建连接对象
  const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    port:"3306",
    database:"blogServer"
  })
  // 开始连接
  con.connect()
  // 执行sql语句
  const sql = "select * from users"
  con.query(sql,(err,result)=>{
    if(err){
      console.error(err)
      return
    }
    console.log(result)
  })
  // 关闭连接
  con.end()
  ```

  2. 封装：将其封装为系统可用的工具

  ```
  <!-- 先安装mysql npm i mysql -->
  <!-- src下新建config文件夹，config文件夹下新建db.js文件,内容如下 -->
  const env = process.env.NODE_ENV // 获取环境变量参数
  // 配置
  let MYSQL_CONF
  if(env==="dev") {
    MYSQL_CONF={
      host:"localhost",
      user:"root",
      password:"12345678",
      port:"3306",
      database:"blogServer"
    }
  }
  if(env==="production") {
    host:"localhost",
    user:"root",
    password:"12345678",
    port:"3306",
    database:"blogServer"
  }
  module.exports = {
    MYSQL_CONF
  }
  ```

  3. 使用：让 API 直接操作数据库，不再使用假数据

- API 连接 mysql
