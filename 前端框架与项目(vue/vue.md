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
  > 如果显示与隐藏的状态频繁切换的话，就使用 v-show,这样避免了因使用 v-if 频繁销毁与创建 dom 而带来的性能损耗
- 如何遍历对象？——也可以使用 v-for

  ```
  <li v-for="(val,key,index) in obj">
    {{index}} - {{key}} - {{val.title}}
  </li>
  obj:{
    a:{title:"标题1"},
    b:{title:"标题2"},
    c:{title:"标题3"}
  }
  ```

- key 的重要性。key 不能乱写(尽量不要是 random 或者 index)

  > 如果我们使用 index 做 key 在我们渲染到页面的时候变成

  ```
  <ul>
    li key:0 ，id:201401,name:chen
    li key:1 , id:201402,name:sun
    li key:2 , id:201403,name:wang
  </ul>
  ```

  > 如果我们要在中间插入一条数组{id:201404,name:zhou}

  ```
  <ul>
    li key:0 ，id:201401,name:chen
    li key:1 ，id:201404,name:wang
    li key:2 , id:201402,name:sun
    li key:3 , id:201403,name:wang
  </ul>
  ```

  > 当我们在中间插入新元素的时候 新元素的 key 值理所应当变成了 index=1，key 值也就变成了 1 而原本 index==1 的 li 元素的 index 就变成了 2，原本 index==2 的元素 key 值就变成了 3 。 这样就导致虚拟 dom 的 diff 算法在做比较的时候发现，key 值为 1，2，3 的元素和原来的 key 值为 1，2，3 的元素对比的时候发现二者不一样，diff 算法就会重新渲染这三个元素，原本 key 值为 1，2 的元素内容没有发生变化，但是因为 key 值使用的是 index 所以还需要重新渲染，这就失去了虚拟 dom 在性能上的优势，所有我们要使用唯一键值来做标记，例如 id。

  > 如果我们使用 id 做 key 在我们渲染到页面的时候变成

  ```
  <ul>
    li key:201401 ,id:201401,name:chen
    li key:201402 ,id:201402,name:sun
    li key:201403 ,id:201403,name:wang
  </ul>
  ```

  > 如果我们要在中间插入一条数组{id:201404,name:zhou}

  ```
  <ul>
    li key:201401 ，id:201401,name:chen
    li key:201404 ，id:201404,name:wang
    li key:201402 , id:201402,name:sun
    li key:201403 , id:201403,name:wang
  </ul>
  ```

  > 因为我们是已 id 为 key 值，所以当我们向数组中间插入一个新的数据，diff 算法发现原本的三个<li>的 key 值没改变，只是在中间加入了一个新的元素，原本的三个<li>得到了复用这也就利用了虚拟 dom 在性能上的优势

- v-for 和 v-if 不能一起使用（不能作用在同一个标签上）！v-for 的优先级高于 v-if
- 事件的 event 参数
  ```
  @click="increment1" // 可以直接获取event
  @click="increment2(2,$event)" // 需要再自定义参数后面进行传递
  increment1(event) {
    ...
  }
  increment2(val,event) {
    ...
  }
  ```
  > event 是原生的，事件被挂载到当前元素 event.target/event.currentTarget
  > 事件修饰符:stop、prevent、capture、self
  > 按键修饰符:@click.ctrl(即使 alt 或者 shift 被一同按下时也会触发)，@click.ctrl.exact(有且只有 ctrl 被按下时才触发)，@click.exact(没有任何系统修饰符被按下的时候才触发)
  > 表单修饰符：lazy、number(转换成数字)、trim

### 描述 Vue 组件生命周期（有父子组件的情况）（重点）

#### 单个组件生命周期

> 生命周期分了挂载阶段、更新阶段、销毁阶段 <https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90>

#### 父子组件生命周期

> 初次渲染时 生命周期钩子执行顺序是： 父组件 created、子组件 created、子组件 mounted、父组件 mounted
> 更新（状态）时生命周期钩子执行顺序是：父组件 update、子组件 update、子组件 updated、父组件 updated
> 销毁阶段生命周期钩子执行顺序是：父组件 beforeDestroy、子组件 beforeDestroy、子组件 destroyed、父组件 destroyed

### vue 组件如何通讯

#### vue 父子组件如何通讯

- props 和\$emit

  ```
  <!-- 子组件向父组件传值通过在子组件调用this.$emit方法 -->
  <!-- 子组件： -->
  <input @click="sendMsg" />
  sendMsg(){
    this.$emit('func',this.msg) // 调用父组件事件
  }
  <!-- 父组件： -->
  <child @func="getMsgFormChild"></child>
  getMsgFormChild(data){
    this.msgFromChild=data;
  }
  ```

#### 组件间通讯-自定义事件(实现两个不想关的组件的通讯，一般是兄弟组件，或相差很远的组件:非父子非兄弟)

    ```
    <!-- event.js： -->
    import Vue from "vue
    export default new Vue()
    <!-- 或： -->
    const Bus = new Vue()
    export default Bus

    ```

    ```
    <!-- 一个组件中调用自定义组件 -->
    <!-- 引入event文件 --> // 或者在mainjs里面引入并注册到根vue实例上（Vue.prototype.$bus=Bus）
    event.$emit('onAdd',this.title) // 调用自定义事件
    ```

    ```
    <!-- 另一个组件中响应自定义组件 -->
    <!-- 引入event文件 -->
    mounted(){
      event.$on('onAdd',this.addHandler)
    },
    beforeDestory(){
      <!-- 在组件销毁时也及时销毁自定义事件，否则可能造成内存泄漏 -->
      event.$off('onAdd',this.addHandler)
    }
    ```

## 高级特性——不常用，但体现深度(考察做过的项目是否有深度和复杂度，至少在项目中用到了高级特性)

### 自定义 v-model

### \$nextTick

### slot

### 动态、异步组件

### keep-alive

### mixin

## Vuex 和 Vue-router 使用

<!-- # 问题

## v-show 和 v-if 的区别

## 为何 v-for 中要用 key

## 描述组件渲染和更新的过程

## 双向数据绑定 v-model 的实现原理 -->
