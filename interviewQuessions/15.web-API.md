# 全面考虑，js 内置的全局函数和对象有哪些？

- 之前讲过的 Object Array Boolean String Math JSON 等
- 刚刚提到的 window document
- 接下来还有继续讲到的所有未定义的全局变量，如 navigator.userAgent

# 知识点

- DOM 本质

> document Object Model
> DOM 可以理解为：浏览器把拿到的 HTML 代码，结构化成一个浏览器能识别并且 js 可操作的一个模型而已

- DOM 节点操作
  - 获取 dom 节点
    1. document.getElementById
    2. document.getElementsByTagName
    3. document.getElementsByClassName
    4. document.querySelectorAll
    ```
    var pList = document.querySelectorAll('p')
    var p = pList[0]
    console.log(p.style.width) // 获取样式
    p.style.width = '100px' // 修改样式
    console.log(p.className) // 获取className
    p.className = 'p1' // 修改className
    // 获取nodeName和nodeType
    console.log(p.nodeName)
    consoe.log(p.nodeType)
    ```
  - property
    ```
    var div1 = document.getElementById('div1')
    console.log(div1.className)
    div1.className = 'abc'
    console.log(div1.className)
    ```
  - Attribute
    ```
    var p1 = document.getElementById('p1')
    console.log(p1.getAttribute('data-name'))
    p1.setAttribute('data-name','xyz')
    ```
- DOM 结构操作

  - 新增节点
    ```
    createElement()
    appendChild()
    ```
  - 获取父节点

    ```
    el.parentElement

    ```

  - 获取子节点

    ```
    el.childNodes
    ```

  - 删除节点

    ```
    var child = div1.childNodes
    div1.removeChild(child[0])
    ```

## dom 操作

### 题目

- DOM 是哪种基本的数据结构？
  树结构
- DOM 操作的常用 API 有哪些？
  1. 获取 dom 节点，以及节点的 property 和 Attribute
  2. 获取父节点，获取子节点
  3. 新增节点，删除节点
- DOM 节点的 attr 和 property 有何区别？
  property 只是一个 js 对象的属性的修改
  Attribute 是对 html 标签属性的修改

## BOM 操作

- 题目
  1. 如何检测浏览器的类型
  2. 拆解 url 的各部分
- 知识点

  1. navigator

  ```
   var ua = navigator.userAgent
   var isChrome = ua.indexOf('Chrome')
   console.log(isChrome)
  ```

  2. screen

  ```
  console.log(screen.width)
  console.log(screen.height)
  ```

  3. location

  ```
  location.href // 整个url
  location.protocol // 协议 http 、https
  location.host // 域名 xxx.xxx.xxx.com
  location.pathname // 路径 /learn/199.html
  location.search // ?后的参数 "?cid=99&a=b"
  location.hash // #后面的hash "#mid=100"
  ```

  4. history

  ```
  history.back() // 后退
  history.forward() // 前进
  ```

- 解答
