# react 组件如何通讯

# JSX 本质是什么

# context 是什么，有何用途

# shouldComponentUpdate（scu） 的用途

# 描述 redux 单项数据流

# setState 是同步还是异步？

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
