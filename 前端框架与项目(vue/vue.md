# vue 使用

## 基本使用，组件使用——常用，必须会

- 插值、表达式
- 指令、动态属性（即定义成变量来使用的属性）
- v-html: 会有 XSS 风险，会覆盖子组件
- computed 有缓存，data 不变则不会重新计算,如果 v-model 中使用了 computed 中定义的属性，则 computed 属性要定义 get 和 set
- watch 如何深度监听
  > 属性里面写 handler 函数和 deep 属性设为 true。
- watch 监听引用类型，拿不到 oldVal 因为指针相同
- class 和 style 的使用

```
<p :class="{black:isBlack,yellow:isYellow}"></p>
<p :class="[black,yellow]"></p>
<p :style="styleData"></p>
<!-- isBlack,isYellow是布尔类型值 -->
<!-- black，yellow属性定义了类名 -->
<!-- styleData是一个对象类型的值，使用驼峰命名 -->
```

- v-if v-else-if v-else 的用法，可使用变量，也可以使用===表达式
- v-if 和 v-show 的区别
  > 使用 v-if，如果不该显示就不会渲染 dom,v-show,不该显示也会渲染 dom，然后 display:none
- v-if 和 v-show 的使用场景
  > 如果显示与隐藏的状态频繁切换的话，就使用 v-show,这样避免了使用 v-if 带了的频繁销毁与创建 dom 而带来的性能损耗
- 如何遍历对象？——也可以使用 v-for

- key 的重要性。key 不能乱写(尽量不要是 random 或者 index)
- v-for 和 v-if 不能一起使用（不能作用在同一个标签上）！

## 高级特性——不常用，但体现深度

## Vuex 和 Vue-router 使用

# 问题

## v-show 和 v-if 的区别

## 为何 v-for 中要用 key

## 描述 Vue 组件生命周期（有父子组件的情况）

## vue 组件如何通讯

## 描述组件渲染和更新的过程

## 双向数据绑定 v-model 的实现原理
