# react 组件如何通讯

> 1. props 2. cotext 3. redux 4.（自定义事件（类似 vue 中的 bus 吧））

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
> SCU 不一定每次都用——需要的时候才去优化，先不用，有性能问题时再考虑使用
> SCU 一定要配合不可变值的写法 ▲▲▲
> 如果违反了不可变值，那么在对 nextState 和 this.state 进行比较时两者一定是相等的，既然相等了那由于 SCU 的处理，界面就不会重新渲染了
> 不建议在 SCU 中做深度比较

- PureComponent 和 React.memo
  > pureComponent 的 scu 中实现了浅比较（对 props 和 state）用法：
  <!-- 详细讲解 https://www.jianshu.com/p/b3d07860b778 -->
  ```
    export default class PageB extends React.PureComponent {
    // 将PureComponebt改成Component看看效果
    state = {
      items: [{ a: 1 }, { a: 2 }, { a: 3 }],
    };
    handleClick = () => {
      const { items } = this.state;
      // items[0].a = 3;
      // items.pop();
      items.splice(items.length - 1, 1);
      this.setState({ items });
      // this.setState({ items: [...items] });
    };
    render() {
      console.log('Parent Rendering', this.state.items);
      return (
        <div>
          <ul>
            {this.state.items.map(i => (
              // <li key={i}>{i}</li>
              <li key={i.a}>{i.a}</li>
            ))}
          </ul>
          {/* <div>{this.state.item[0].a}</div> */}
          <button onClick={this.handleClick}>delete</button>
        </div>
      );
    }
    }
  ```
  > React.memo,函数组件中的 pureComponent
  ```
    function Child({seconds}){
      console.log('I am rendering');
      return (
          <div>I am update every {seconds} seconds</div>
      )
    };
    export default React.memo(Child)
  ```
- 不可变值 immutable.js(如果不想按照不可变值的方式更新 state,就引入这个 js 库，但引入是有成本的)

# Redux

> react 是单向数据流的，数据只能从 A 传到 B，从 B 再传到 C，从 A 直接到 C 是不行的，另外兄弟组件无法共享数据
> 在 redux 中：

- State: react 中的状态，是只读对象，不可直接修改，不可变值，要返回全新的对象而不是对 state 进行修改
- Reducer: 基本函数，用于对 State 的业务处理，state 是不可变值，在这里基于原有的 state 返回全新的对象,（由 Action 来触发）
- Action: 普通对象，用于描述事件行为，改变 State

> react 集成步骤:（安装 redux 和 react-redux 和 redux-devtools-extension --save 用于调试，chrome 应用商店同时也要下载 react 的 devtools）

1. 创建 Action 模块
2. 创建 Reducer 模块
3. 创建 Store 模块（store 引用 reducer,action 触发 reducer；store 依赖于 reducer，reducer 依赖于 action）
4. 通过 connect 方法将 React 组件和 Redux 连接起来
5. 添加 Provider 作为项目的根组件，用于数据的存储

   > 在组件中，通过事件触发 action 中定义的事件行为，action 调 reducer 中的数据包装处理方法
   > 同步 action 和异步 action

   ```
    // 同步action
      export const addTodo = text =>{
        // 返回action对象
        return {
          type:'ADD_TODO',
          id:nextTodoId++,
          text
        }
      }
      // 异步 action
      export const addTodoAsync = text => {
        // 返回函数，其中有dispatch
        return (dispatch)=>{
          // ajax 异步获取数据
          fetch(url).then(res=>{
            // 执行异步 action
            dispatch(addTodo(res.text))
          })
        }
      }
      // 另外异步的方式要在创建store的文件里引入thunk from 'redux-thunk';const store=createStore(rootReducer,applyMiddleware(thunk));(import { applyMiddleware } from "redux";作为中间件引入)
   ```

# 简述 Redux 中间件的原理

# ReactHook

- 函数式组件和 class 组件:
  > class 组件有状态、生命周期等；函数式组件没有状态和生命周期等,但有 hook....
- 使用函数式组件使用 hook 是为了解决一些问题比如:

  > react 、纯函数组件除了根据 props state 等渲染特定 ui，还有网络请求，dom 操作，订阅数据来源等等和纯函数界面渲染不相关的事情，这些操作被称之为副作用。react 组件中有两种常见的副作用：无需清除的副作用、需要清除的副作用。

  1. 组件很难复用状态逻辑(原始的 HOC 或者 render Props),而 hook 可以让你在无需修改组件的逻辑时就能够完成逻辑复用
  2. 复杂组件难以理解,尤其是生命周期函数

  ```
  // 相似的逻辑都糅合在一起
  componentDidMount(){
    const {id} = this.props
    fetch(`xxx?id=${id}`)
    document.addEventListener('keypress',callback)
  }
  componentDidUpdate(){
    const {id} = this.props
    fetch(`xxx?id=${id}`)
  }
  componentWillUnmount(){
    document.removeEventListener('keypress',callback)
  }
  ```

- Hook 是什么?什么时候会用 useState Hook?
  > Hook 是让你能够在函数组件中钩入 react 特性的函数,命名一般都以 use 开头
  > 函数式组件如果想用 state,就可以使用 useState Hook
- React 自定义 Hook 的妙处
  > 把逻辑上重复的代码提取到一个函数中，然后像调用一个函数一样去使用
- Hook 使用规则
  > 一：只在最顶层组件使用 Hook;二：只在 React 函数中调用 Hook,也可以在自定义 Hook 中调用其它 Hook,不要在普通的 js 函数中调用 hook
- hoc 的一些缺陷，参考 ts-react-auth 项目

# react 的一些特点：

- 状态提升
- 单向数据流：任何可变数据理应只有一个单一数据源，并且要保持自上而下的数据流；通常在拥有数据源的地方对数据进行综合处理
- 一切皆 props

# React useRef

> react 函数组件中每一次的操作中的 props 和 state 都会形成闭包保持不变，直到下一次的操作。
> 为了能实时拿到最新的 props 和 state，就要用到 useRef,
> useRef 是多次渲染之间的纽带:const likeRef = useRef(0);setLike(like+1);likeRef.current++。使用时使用 likeRef。likeRef 保留的一直都是同一个值的索引。不像 useState 中的 state prop 在每一次的渲染时都是一个闭包。
> 使用 useRef 可以实现函数式组件没有的生命周期的需求，（区分组件首次加载和组件更新）

```
const didMountRef = useRef(false)
useEffect(()=>{
  if(didMountRef.current) {
    console.log('this is updated')
  }else {
    didMountRef.current=true
  }
})
```

> useRef 还能用于获取最新 dom 节点：参考 Vikingsship 项目

```
const domRef=useRef<HTMLInputElement>(null)
return(
  <input type="text" ref={domRef} />
)
useEffect(()=>{
  if(domRef&&domRef.current){
    domRef.current.focus()
  }
})
```

# React useContext Hook
