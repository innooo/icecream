var _a = function(selector, context) {
  // new原型中的init方法保证返回实例本身的同时，隔离原型init中的this和实例（this）
  return new _a.fn.init();
}

_a.prototype = {
  init: function() {
    return this;
  },
  say: function() {
    console.log(this.name);
    return this;
  },
  cry: function() {
    console.log(this.voice);
    return this;
  },
  name: 'Lily',
  voice: 'wa wa'
}

_a.fn = _a.prototype;

// 通过把原型中init的prototype指向_a的原型来保证_a工厂方法构造出来的对象能够使用原型中的方法
_a.fn.init.prototype = _a.fn;

// ua中的扩展方法 可以用于扩展ua的接口，也可以拷贝对象
_a.extend = _a.fn.extend = function() { // boolean, obj1, obj2 ...
  var target = arguments[0] || {}, // 拷贝的目标
      i = 1, // 需要拷贝的源对象从第几个参数开始，默认从第二个开始拷贝
      length, // 参数个数
      options, // 当前被遍历到的对象
      src, // 
      copy,
      deep = false; // 深拷贝
  
  //判断是否为深拷贝
  if(typeof target == 'boolean') {
    deep = target;
    target = arguments[1] || {};
  }

  // 如果target不是object
  if(typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }

  // 如果只有一个参数
  if(length === i) {
    target = this;
    --i; // 如果只有一个参数则目标为this 而所有的参数都是源对象
  }

  for(; i < length; i++){
    if(options = arguments[i] != null) {
      for(name in options) {
        src = target[name];
        copy = options[name];
      }
    }
  }

  return target;
}

/**
 * sizzle 选择器引擎
 */
