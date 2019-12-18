> 当项目功能越来越多，代码量便也会越来越多，后期的维护难度会增大，此时在 JS 方面就会考虑使用模块化规范去管理。建议学习完模块化规范以后再学习项目构建，以更好的武装自己的技能。
> 模块化是将一个复杂的程序依据一定的规则（规范）封装成几个块（文件），并进行组合在一起；块的内部数据/实现是私有的，只是向外部暴露一些接口（方法）与外部其它模块通信

```
// 最早我们这样写代码,global被污染，很容易命名冲突
function foo() {
    // ...
}
function bar() {
    // ...
}
// 之后简单封装：namespace模式,减少了global上的变量数目，本质是对象，一点都不安全
var MYAPP= {
    foo: function() {},
    bar: function() {}
}
MYAPP.foo();
// 再之后使用匿名闭包即IIFE模式；（函数是js唯一的local scope）
var Module = (function(){
    var _private = "safe now";
    var foo = function() {
        console.log(_private)
    }
    return {
        foo: foo
    }
})()
Module.foo()
Module._private; // undefined
// 再增强一点：引入依赖（注入当前所依赖的模块）；这就是模块模式，也是现代模块化实现的基石
var Module = (function($){
    var _$body = $("body"); // can use jquery now!
    var foo = function() {
        console.log(_$body)
    }
    // 暴露出模块
    return {
        foo: foo
    }

})(jQuery)
Module.foo();
```

# 为什么要模块化
