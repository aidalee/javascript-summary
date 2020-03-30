// jQuery1.5之前
var ajax = $.ajax({
  url: "data.json",
  success: function() {
    console.log("s1");
    console.log("s2");
    console.log("s3");
  },
  error: function() {
    console.log("error");
  }
});
console.log(ajax); // 返回一个XHR对象
// 1.5之后
var ajax = $.ajax("data.json");
ajax
  .done(function() {
    console.log("s1");
  })
  .fail(function() {
    console.log("error");
  })
  .done(function() {
    console.log("s2");
  });
console.log(ajax); // 返回一个XHR对象
// 很像promise的写法
var ajax = $.ajax("data.json");
ajax
  .then(
    function() {
      console.log("success1");
    },
    function() {
      console.log("error1");
    }
  )
  .then(
    function() {
      console.log("success2");
    },
    function() {
      console.log("error2");
    }
  );
//   jquery-deferred实际应用
var wait = function() {
  var task = function() {
    console.log("执行完成");
  };
  setTimeout(task, 2000);
};
wait();
// 加入有新需求要在task执行完成之后继续执行其他任务，如果在task中加操作代码，违背了开放封闭原则
// 对以上代码做下修改
function waitHandle() {
  var dtd = $.Deferred();
  var wait = function(dtd) {
    var task = function() {
      console.log("执行完成");
      // 成功
      dtd.resolve();
      // 失败
      //   dtd.reject();
    };
    setTimeout(task, 2000);
    //   wait 返回
    return dtd;
  };
  //   最终返回
  return wait(dtd);
}
var w = waitHandle();
// w.reject() // 如果这里调用了rejecte方法，下面的方法都会进入错误回调
w.then(
  function() {
    console.log("ok1");
  },
  function() {
    console.log("error1");
  }
).then(
  function() {
    console.log("ok2");
  },
  function() {
    console.log("error2");
  }
);
// 总结
// dtd的API可分成两类，用意不同。第一类（主动触发）：dtd.resolve 、dtd.reject;第二类（被动监听）：dtd.then、dtd.done、dtd.fail;
// 这两类应该分开，否则后果很严重！（可以在上面代码最后执行dtd.reject()试一下后果）
// 因此对以上代码做修改
function waitHandle() {
  var dtd = $.Deferred();
  var wait = function(dtd) {
    var task = function() {
      console.log("执行完成");
      // 成功
      dtd.resolve();
      // 失败
      //   dtd.reject();
    };
    setTimeout(task, 2000);
    //   wait 返回
    return dtd.promise(); // 这里返回promise而不是直接返回deferred对象
  };
  //   最终返回
  return wait(dtd);
}
var w = waitHandle(); // 经过上面的改动，w接收的就是一个promise对象（只有dtd.then、dtd.done、dtd.fail等这些监听的方法）。
$.when(w)
  .then(function() {
    console.log("ok 1");
  })
  .then(function() {
    console.log("ok 2");
  });
// w.reject() // 执行这句话会直接报错
