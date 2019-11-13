// 自执行函数
(function() {
  var jQuery = function(selector) {
    return new jQuery.fn.init(selector);
  };
  //   构造函数
  var init = (jQuery.fn.init = function(selector) {
    var slice = Array.prototype.slice;
    var dom = slice.call(document.querySelectorAll(selector));
    var i,
      len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || "";
  });

  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    // 其他函数...
    css: function(key, value) {
      alert("css");
    },
    html: function(value) {
      return "模拟html";
    }
  };
  init.prototype = jQuery.fn;
  window.$ = jQuery;
})(window);
// 使用
var $p = $("p");
$p.css("color", "red"); // css 是原型方法
console.log($p.html()); // html 是原型方法

var $div1 = $("#div1");
$div1.css("color", "blue"); // css 是原型方法
console.log($div1.html()); // html 是原型方法
