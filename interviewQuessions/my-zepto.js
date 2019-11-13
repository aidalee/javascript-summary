(function() {
  var zepto = {};
  function Z() {
    var i,
      len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || "";
  }

  zepto.Z = function(dom, selector) {
    return new Z(dom, selector);
  };

  zepto.init = function(selector) {
    var slice = Array.prototype.slice;
    var dom = slice.call(document.querySelectorAll(selector));
    return zepto.Z(dom, selector);
  };

  var $ = function(selector) {
    return zepto.init(selector);
  };
  window.$ = $;
  $.fn = {
    constructor: zepto.Z,
    css: function(key, value) {
      alert("css");
    },
    html: function(value) {
      return "模拟html";
    }
  };
  Z.prototype = $.fn;
})(window);
// 使用
var $p = $("p");
//  var $ = function(selector) {
//    return zepto.init(selector);
//  };
$p.css("font-size", "40px");
alert($p.html());
var $div1 = $("#div1");
$div1.css("color", "blue");
alert($div1.html());
