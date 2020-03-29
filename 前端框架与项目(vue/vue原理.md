# 如何理解 MVVM

> 传统组件只是静态渲染，更新还要依赖于操作 DOM
> 数据驱动视图-Vue MVVM
> 数据驱动视图-React setState
> 答题技巧：说出以上的点，并配合 mvvm 流程图做个大概解说（model、view、ViewModel）

# 监听 data 变化的核心 API 是什么

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

<!-- # 问题

## 描述组件渲染和更新的过程

## 双向数据绑定 v-model 的实现原理

-->
