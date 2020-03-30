# 如何理解 MVVM

> 传统组件只是静态渲染，更新还要依赖于操作 DOM
> 数据驱动视图-Vue MVVM
> 数据驱动视图-React setState
> 答题技巧：说出以上的点，并配合 mvvm 流程图做个大概解说（model、view、ViewModel）

## 监听 data 变化的核心 API 是什么

- 涉及概念：Vue 响应式

  > 组件 data 的数据一旦变化，立刻触发视图的更新；实现数据驱动视图的第一步；（考察 Vue 原理的第一题）

- 核心 API-Object.defineProperty(答题时的重点)
- 如何实现响应式

  1.基本代码演示

      ```
      const data={};
      const name = 'zs'
      Object.defineProperty(data,"name",{
          get:function(){
              return name
          }
          set:function(newVal){
              name=newVal
          }
      })
      // 测试
      console.log(data.name)
      data.name='ls'

      ```

  2.如何深度监听 data 变化：监听数组、复杂对象深度监听

  ```

  ```

  3. Object.defineProperty 缺点

  > 深度监听需要递归到底，一次性计算量大
  > 无法监听新增/删除属性（所以有 Vue.set Vue.delete）

- Object.defineProperty 的一些缺点（Vue3.0 启用 proxy,但 proxy 有兼容性问题，且无法 polyfill,所以 vue2.x 还会使用一段时间）

## 虚拟 dom

> 传统都是 js/jq 操作 dom,操作 dom 耗费性能；vdom 则用 js 模拟 dom 结构，计算出最小的变更，操作 Dom(可能会考察虚拟 dom 结构)
> snabbdom 是一个简洁强大的 vdom 库，易学易用；vue 参考它实现的 vdom 和 diff
> vue3.0 重写了 vdom 的代码，优化了性能，但 vdom 的基本理念不变，面试考点也不变，reactvdom 具体实现和 vue 也不同，但不妨碍统一学习

```
<div id="div1" class="container">
  <p>vdom</p>
  <ul style="font-size:20px">
    <li>a</li>
  </ul>
</div>
<!-- 对应的vnode: -->
{
  tag:'div',
  props:{
    className:'container',
    id:'div1'
  },
  children:[
    {
      tag:'p',
      children:'vdom'
    },
    {
      tag:'ul',
      props:{style:'font-size:20px'},
      children:[
        {
          tag:'li',
          children:'a'
        }
      ]
    }
  ]
}
```

## diff 算法（前端热门话题）

> diff 算法是 vdom 中最核心最关键的部分，diff 算法能在日常使用 vue React 中体现出来（如 key）
> 从时间复杂度 o(n^3)优化到时间复杂度 o(n)；只比较同一层级，不跨级比较；tag 不相同，则这届删掉重建，不再深度比较；tag 和 key，两者都相同，则认为是相同节点，不再深度比较

## 模板编译（将模板转为 js 代码的过程即是模板编译）

> 模板是 vue 开发中最常用的部分，它不是 HTML，它有指令、插值、js 表达式;面试不会直接问，但会通过“组件渲染和更新过程”考察

- 前置知识：JS 的 with 语法
  > vue template complier(vue 模板编译)讲模板编译为 render 函数，执行 render 函数生成 vnode
- vue 模板被编译成了什么

  > 编译成了 render 函数，执行 render 函数返回 vnode，基于 vnode 再执行 patch 和 diff（后面会讲）
  > 使用 webpack vue-loader，会在开发环境下编译模板

- vue 组件可用 render 代替 template
  > 在有些复杂情况下，不能用 template，可以考虑用 render;react 一直都用 render(没有模板)，和这里一样

## 前端路由原理

> 稍微复杂一点的 spa,都需要路由；vue-router 也是 vue 全家桶的标配之一；属于“日常使用相关联的原理”，面试常考
> to B（后台系统）推荐用 hash，简单易用，对 url 规范不敏感
> to C 的系统，可以考虑选择 H5 history（利于 seo），但需要服务端支持。

- hash 的特点：

1. hash 变化会触发网页跳转，即浏览器的前进、后退
2. hash 变化不会刷新页面，spa 必需的特点
3. hash 永远不会提交到 server 端
4. 用到的 Api - window.onhashchange

- H5 history

1. 用 url 规范的路由，但跳转时不刷新页面（以实现 spa）
2. 通过 history.pushState（打开新路由） 和 window.onpopstate（前进/后退） 两个方法来实现
3. 需要后端进行配置

<!-- # 问题

## 描述组件渲染和更新的过程

> 一个组件从初次渲染到页面，修改 data 触发更新过程如下：

1. 响应式：监听 data 属性 getter setter（包括数组） 2.模板编译：模板编译成 render 函数，执行生成 vnode
   3.vdom：patch(elem,vnode)和 patch(vnode,newVnode)
   > 过程中的要点

- 初次渲染过程
  > 初次渲染时如果使用了 vue-loader，那么在开发环境下就已经解析模板为 render 函数了，直接运行即可；否则就是在浏览器中进行解析；触发响应式，监听 data 属性 getter setter；执行 render 函数，生成 vnode，patch(elem,vnode)
- 更新过程
  > 修改 data，触发 setter;重新执行 render 函数，生成 newVnode;patch(vnode,newVnode)
- 异步渲染
  > 回顾\$nextTick,汇总 data 的修改，一次性更新视图，目的是减少 dom 操作次数，提高性能

## 双向数据绑定 v-model 的实现原理

-->
