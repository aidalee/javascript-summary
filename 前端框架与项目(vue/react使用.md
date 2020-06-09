# React VS Vue

> react 和 vue 一样重要，特别是大厂，力求两者都学会；react 和 vue 有很多相通之处，而且正在趋于一致。
> react 应用了纯函数的理念（函数组件）

## 基本使用

- JSX 基本使用

1. 变量、表达式
2. class style
3. 子元素和组件

## 高级特性

## redux 和 react-router

## target 和 currentTarget 的区别

- target：触发事件的元素。currentTarget：事件绑定的元素。
- 两者在没有冒泡的情况下，是一样的值，但在用了事件委托的情况下，就不一样了；
- 比如说现在有 A 和 B， A.addChild(B) A 监听鼠标点击事件那么当点击 B 时，target 是 B，currentTarget 是 A ;也就是说，currentTarget 始终是监听事件者，而 target 是事件的真正发出者
