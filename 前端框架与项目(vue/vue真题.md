# v-show 和 v-if 区别

> v-show 通过 css display 控制显示和隐藏；v-if 组件真正的渲染和销毁，而不是显示和隐藏。

## 为何在 v-for 中用 key

> 必须用 key，且不能是 index 和 random;diff 算法中通过 tag 和 key 来判断，是否是 sameNode；减少渲染次数，提升渲染性能。

## 组件通讯

1. 父子组件 props 和 this.\$emit
2. 自定义事件 event.$emit.event、event.$on.event
3. vuex

## 双向数据绑定 v-model 的实现原理

1. input 元素的 value=this.name
2. 绑定 input 事件 this.name = \$event.target.value
3. data 更新触发 render

## 对 MVVM 的理解

> 看 images 图解

## computed 有何特点

> 有缓存，data 不变不会重新计算；合理使用能提高性能

## 为何 data 是一个函数

> vue 组件是一个类，类在被引用（实例化）时，如果 data 不是函数的话，那么每个实例化的组件都共用同一个 data，一个修改影响另一个

## ajax 应该放在哪个生命周期

> mounted,因为 js 是单线程，ajax 异步获取数据；放在 mounted 之前没有用，只会让逻辑更加混乱
> 引用网友对此的理解：1）ajax 请求快，和——获取到数据之后触发 setter 直到 re-render 发生、这个过程的计算耗时相比很小，那么放哪都可以。
> 2）ajax 请求慢，放在 created 里，可以更早地获取到数据触发 setter，视图的重新渲染也会提前，但因为 created 发生在真实 dom 挂载之前，可能导致首屏等待时长变长。如果要尽快看到视图，那就放到 mounted 里；如果要尽快看到有价值的视图，那就放到 created 里

## 如何将组件所有的 props 传递给子组件

> 用\$props：

```
<User v-bind="$props"/>
```

## 何时要使用异步组件（能优化性能）

1. 加载大组件
2. 路由异步加载

## 何时需要使用 keep-alive（能优化性能）

1. 缓存组件，不需要重复渲染
2. 如多个静态 tab 页的切换

## 何时需要使用 beforeDestory

1. 解绑自定义事件 event.\$off
2. 清除定时器
3. 解绑自定义的 dom 事件，如 window scroll 等

## 什么是作用域插槽

## vuex 中 action 和 mutation 有何区别

1. action 中处理异步，mutation 不可以
2. mutation 做原子操作（只做一个处理）
3. action 可以整合多个 mutation

## 如何配置 vue-router 异步组件加载

## 用 vnode 描述一个 dom 结构

## vue 如何监听数组变化

1. Object.defineProperty 不能监听数组变化

2. 重新定义原型，重写 push pop 等方法，实现监听
3. proxy 可以原生支持监听数组变化

## 描述响应式原理

> 整合监听 data 变化和组件渲染更新的流程这两块知识点

## 简述 diff 算法过程

## vue 常见性能优化方式

1. 合理使用 v-show 和 v-if
2. 合理使用 computed
3. v-for 时加 key，以及避免和 v-if 同时使用
4. 自定义事件、dom 事件及时销毁（以免内存泄露，导致页面卡死）
5. 合理使用异步组件和 keep-alive
6. data 层级不要太深
7. 使用 vue-loader 做模板编译
8. webpack 层面的性能优化
9. 前端通用的性能优化，如图片懒加载
10. 使用 ssr
