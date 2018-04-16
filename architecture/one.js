// 实现此种形式： $().html().css();

/**
 * 每次调用方法都需要返回当前的实例
 */

var aQuery = function(selector, context) {
  return new aQuery.fn.init(); //实用new的形式来隔离prototype.init 和实例本身的this
}

var _a = aQuery;

aQuery.prototype = {
  init: function() {
    return this;
  },
  say: function() {
    console.log(this.name);
    return this;
  },
  name: 20,
  cry: function() {
    console.log('wa wa');
    return this;
  }
}

aQuery.fn = aQuery.prototype; // 简化prototype写法

aQuery.fn.init.prototype = aQuery.fn; // 通过原型引用能够访问实例属性和方法

// 实例和原型扩展方法

aQuery.extend = aQuery.fn.extend = function() {
  // 这里的this指向，根据调用有关，可以实现实例和原型的扩展
  console.log(this);
}

_a().say().cry().say();
console.log(_a().name);