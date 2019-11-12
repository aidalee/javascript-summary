// Promise有三种状态，分别为pending、resolved、rejected
function Promise(executor) {
    let self = this
    self.value = undefined
    self.reason = undefined
    self.status = 'pending' //在内部维护一个status状态
    // 因为value和reason值需要在Promise实例方法then中使用，
    self.onResolvedCallbacks = []
    self.onRejectedCallbacks = []
    // 所以把这两个值，赋给new出来的实例
    function resolve(value) {
        // 声明一个resolve函数
        // 当调用了resolve并且传参数时，则把这个value值赋予self.value
        if (self.status === 'pending') {
            // 添加状态判断，当状态为pending的时候才能执行
            self.value = value
            self.status = 'resolved' //当调用了resolve时更改状态为resolved
            self.onResolvedCallbacks.forEach(fn => fn())
        }
    }
    function reject(reason) {
        // 声明一个reject函数
        // 当调用了reject并且传参数时，则把这个reason值赋予self.reason
        if (self.status === 'pending') {
            // 添加状态判断，当状态为pending的时候才能执行
            self.reason = reason
            self.status = 'rejected'
            self.onRejectedCallbacks.forEach(fn => fn())
        }
    }
    // 把resolve、reject函数传到executor
    // 当我们在执行executor时，内部抛出错误的时候，可以利用try catch来处理这个问题
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }

}


// 因为Promise的实例都有then方法，那么意味着then方法是在Promise的原型对象中的方法
// 对应上面成功的回调函数onFulfilled以及失败的回调函数onRejected
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    if (self.status === 'resolved') {
        onFulfilled(self.value)
        // 当调用了resolve函数后，会执行成功的回调函数，
        // 并且把resolve中传递的值，传递给成功的回调函数
    }
    if (self.status === 'rejected') {
        onRejected(self.reason)
        // 调用了reject函数后，会执行成功的回调函数，
        // 并且把reject中传递的值，传递给失败的回调函数
    }
    if (self.status === 'pending') {
        self.onRejectedCallbacks.push(() => {
            onFulfilled(self.value)
        })
        self.onRejectedCallbacks.push(() => {
            onRejected(self.reason)
        })
    }
}
// module.exports = Promise