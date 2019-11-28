# 题目

## 手动编写一个 ajax,不依赖第三方库

## 跨域的几种实现方式

# 知识点

## XMLHttpRequest

- 一个 ajax 请求的源码
  ```
  var xhr = new XMLHttpREquest()
  xhr.open("GET","/api",false)
  xhr.onreadystatechange = function () {
      // 这里的函数异步执行，可参考之前JS基础中的异步模块
      if(xhr.readyState === 4) {
          if(xhr.status === 200) {
              alert(xhr.responseText)
          }
      }
  }
  xhr.send(null)
  ```
- ie 兼容性问题
  - ie 低版本使用 ActiveObject,和 W3C 标准不一样
  - 了解即可无需深究

## 状态码说明

readyState：

- 0：（未初始化）还没有调用 send()方法
- 1：(载入) 已调用 send()方法，正在发送请求
- 2：（载入完成）send()方法执行完成，已经接收到全部响应内容
- 3：（交互）正在解析响应内容
- 4：（完成）响应内容解析完成，可以在客户端调用了

status：

- 2xx：表示成功处理请求。如 200
- 3xx：需要重定向，浏览器直接跳转
- 4xx：客户端请求错误，如 404
- 5xx：服务器端错误

## 跨域

- 什么是跨域

  - 浏览器有同源策略，不允许 Ajax 访问其他域接口
  - 跨域条件：协议、域名、端口，有一个不同就算跨域
  - 但是有三个标签可以跨域：<img src=xxx>,<link href=xxx>,<script src=xxx>
    - 三个标签的应用场景
      - <img> 用于打点统计，统计网站可能是其他域
      - <link><script>可以使用CDN，CDN的也是其他域
      - <script>也可以用于JSONP
  - 跨域注意事项
    - 所有的跨域请求都必须经过信息提供方允许
    - 如果未经允许即可获取，那是浏览器同源策略出现漏洞

- JSONP
  - JSONP 实现原理
    - 例如你的网站要跨域访问百度的一个接口
    - 百度给你一个地址http://www.baidu.com/api.js
    - 返回内容格式如 callback({x:100,y:200})(可动态生成)
      ```
      window.callback = function (data) {
          // 这是我们跨域得到的信息
          console.log(data)
      }
      <script src="http://www.baidu.com/api.js"></script>
      // 以上返回callback({x:100,y:200})
      ```
- 服务器端设置 http header
  - 另外一个解决跨域的简洁方法，需要服务器端来做
  - 但是作为交互方，我们必须知道这个方法
  - 是将来解决跨域问题的一个趋势
  ```
  // 第二个参数填写允许跨域的域名称，不建议直接写“*”
  response.setHeader("Access-control-Allow-Origin","http://a.com,http://b.com");
  response.setHeader("Access-control-Allow-Headers","X-REquested-Width");
  response.setHeader("Access-control-Allow-Methods","PUT,POST,GET,DELETE, OPTIONS")
  // 接收跨域的cookie
  response.setheader("Access-Control-Allow-Credentials", "true")
  <!-- 不同后端语言的写法可能不一样 -->
  ```
