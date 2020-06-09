# react 组件如何通讯

> props

# JSX 本质是什么

# context 是什么，有何用途——类似于 vue 的 provider 和 inject

# shouldComponentUpdate（scu） 的用途

# 描述 redux 单项数据流

# react 生命周期

> componentDidMount——mounted componentDidUpdate——updated componentWillUnmount——beforeDestroy
> shouldComponentUpdate react 中可选的生命周期
> 父子组件的生命周期和 vue 的一样

# 函数组件和 class 组件的区别?

> 函数组件:纯函数，输入 props，输出 JSX,没有实例，没有生命周期，没有 state

# 非受控组件

> 有 ref、defaultValue defaultChecked、手动操作 dom

# setState 是同步还是异步？

> setState 在原生事件（自己定义的 dom 事件如：document.body.addEventListener('click',this.clickHanlder)）和 setTimeout 中都是同步的，在合成事件和钩子函数中是异步的。
> setState 第一个参数传入的是对象时会被合并，但如果传入的是函数不会被合并

```
// 执行结果只一次+1
this.setState({
  count: this.state.count+1
})
this.setState({
  count: this.state.count+1
})
this.setState({
  count: this.state.count+1
})
// 执行结果是+3
this.setState((prevState,props)=>{
  return {
    count:prevState.count+1
  }
})
this.setState((prevState,props)=>{
  return {
    count:prevState.count+1
  }
})
this.setState((prevState,props)=>{
  return {
    count:prevState.count+1
  }
})
```

# setState ——为什么要使用不可变值（即不能直接操作 state 中的值（不能直接 this.state.value++） ）？

# react 事件为什么要绑定 this

> 事件函数中的 this 默认是 undefined，

```
  handleClick() {
    console.log(this) // undefined
    this.setState({
     x:2
    });
  }
  // 需要在constructor构造函数中绑定 this.handleClick=this.handleClick.bind(this)
```

> 而箭头函数中的 this 指向当前实例，所以不需要再手动绑定

# react 性能优化

> 相较于 vue ,性能优化对于 react 来说更加重要

- SCU

```
// SCU基本用法
shouldComponentUpdate(nextProps,nextState){ // 默认情况下返回true
// nextProps代表传进来的prop,nextState代表组件内自己定义的状态（state）
  if(nextState.count!==this.state.count){
    return true // 可以渲染
  }
  return false // 不重复渲染(render()不执行)
}
```

> 在 react 中只要父组件有更新（其内部任何元素、数据或子组件有更新），那么其内部所有的子组件也都会更新(不管数据有没有变化)；
> SCU 默认的返回是 true
> SCU 不一定每次都用——需要的时候才去优化
> SCU 一定要配合不可变值的写法
> 如果违反了不可变值，那么在对 nextState 和 this.state 进行比较时两者一定是相等的，既然相等了那由于 SCU 的处理，界面就不会重新渲染了

- PureComponent 和 React.memo
- 不可变值 immutable.js(如果不想按照不可变值的方式更新 state,就引入这个 js 库，但引入是有成本的)
