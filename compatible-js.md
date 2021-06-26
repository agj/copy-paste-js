# Copy&Paste JS - Compatible JavaScript

These are utilities that adhere to the ECMAScript 5 standard, for compatibility with environments that might not be up-to-date. [For other versions and more information, check here.](./README.md)

## Array

### every

```js
var every = function every(p) {
  return function (list) {
    return list.every(p);
  };
};
```

### isIn

```js
var isIn = function isIn(list) {
  return function (obj) {
    return list.some(function (a) {
      return a === obj;
    });
  };
};
```

### some

```js
var some = function some(p) {
  return function (list) {
    return list.some(p);
  };
};
```

### uniq

```js
var uniq = function uniq(list) {
  var seen = [];
  return list.filter(function (item) {
    return seen.some(function (a) {
      return a === item;
    })
      ? false
      : (seen.push(item), true);
  });
};
```

## Browser

### makeEl

```js
var makeEl = function makeEl(tag, attrs) {
  var el = document.createElement(tag);
  if (attrs)
    Object.keys(attrs).forEach(function (attr) {
      return el.setAttribute(attr, attrs[attr]);
    });

  for (
    var _len = arguments.length,
      children = new Array(_len > 2 ? _len - 2 : 0),
      _key = 2;
    _key < _len;
    _key++
  ) {
    children[_key - 2] = arguments[_key];
  }

  children
    .map(function (obj) {
      return typeof obj === "string" ? document.createTextNode(obj) : obj;
    })
    .forEach(function (node) {
      return el.appendChild(node);
    });
  return el;
};
```

### onChanged

```js
var onChanged = function onChanged(el, cb) {
  var observer = new MutationObserver(cb);
  observer.observe(el, {
    childList: true,
    subtree: true,
  });
  return observer.disconnect.bind(observer);
};
```

### onLoad

```js
var onLoad = function onLoad(cb) {
  return /interactive|complete/.test(document.readyState)
    ? setTimeout(cb, 0)
    : document.addEventListener("DOMContentLoaded", cb, {
        once: true,
      });
};
```

### sel

```js
var sel = document.querySelector.bind(document);
```

### selAll

```js
var selAll = document.querySelectorAll.bind(document);
```

## Function

### alternate

```js
var alternate = function alternate(f, g) {
  var state = false;
  return function () {
    state = !state;
    return state ? f.apply(void 0, arguments) : g.apply(void 0, arguments);
  };
};
```

### apply

```js
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

var apply = function apply(f) {
  return function (args) {
    return f.apply(void 0, _toConsumableArray(args));
  };
};
```

### call

```js
var call = function call(f) {
  return function () {
    return f.apply(void 0, arguments);
  };
};
```

### callMethod

```js
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

var callMethod = function callMethod(method, args) {
  return function (obj) {
    return args
      ? obj[method].apply(obj, _toConsumableArray(args))
      : obj[method]();
  };
};
```

### counter

```js
var counter = function counter() {
  var i = 0;
  return function () {
    return i++;
  };
};
```

### debounce

```js
var debounce = function debounce(secs, fn) {
  var delay = secs * 1000;
  var timeoutID;

  var exec = function exec(args) {
    return fn.apply(null, args);
  };

  return function () {
    clearTimeout(timeoutID);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    timeoutID = setTimeout(exec, delay, args);
  };
};
```

### delay

```js
var delay = function delay(secs) {
  return function (fn) {
    return setTimeout(fn, secs * 1000);
  };
};
```

### log

```js
var log = function log() {
  for (
    var _len = arguments.length, msg = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    msg[_key] = arguments[_key];
  }

  return function (arg) {
    console.log.apply(console, arg === undefined ? msg : [].concat(msg, [arg]));
    return arg;
  };
};
```

### partial

```js
var partial = function partial(f, args1) {
  return function () {
    for (
      var _len = arguments.length, args2 = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args2[_key] = arguments[_key];
    }

    return f.apply(null, args1.concat(args2));
  };
};
```

### partialR

```js
var partialR = function partialR(f, args1) {
  return function () {
    for (
      var _len = arguments.length, args2 = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args2[_key] = arguments[_key];
    }

    return f.apply(null, args2.concat(args1));
  };
};
```

### pipe

```js
var pipe = function pipe() {
  for (
    var _len = arguments.length, fs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    fs[_key] = arguments[_key];
  }

  return fs.reduce(function (left, right) {
    return function () {
      return right(left.apply(void 0, arguments));
    };
  });
};
```

### throttle

```js
var throttle = function throttle(secs, fn) {
  var waitTime = secs * 1000;
  var last = 0;
  return function () {
    var now = Date.now();

    if (now > last + waitTime) {
      last = now;
      fn.apply(void 0, arguments);
    }
  };
};
```

## Logic

### complement

```js
var complement = function complement(f) {
  return function () {
    return !f.apply(void 0, arguments);
  };
};
```

### eq

```js
var eq = function eq(a) {
  return function (b) {
    return b === a;
  };
};
```

### gt

```js
var gt = function gt(a) {
  return function (b) {
    return b > a;
  };
};
```

### gte

```js
var gte = function gte(a) {
  return function (b) {
    return b >= a;
  };
};
```

### lt

```js
var lt = function lt(a) {
  return function (b) {
    return b < a;
  };
};
```

### lte

```js
var lte = function lte(a) {
  return function (b) {
    return b <= a;
  };
};
```

### not

```js
var not = function not(a) {
  return !a;
};
```

### unless

```js
var unless = function unless(pred) {
  return function (f) {
    return function (a) {
      return pred(a) ? a : f(a);
    };
  };
};
```

### when

```js
var when = function when(pred) {
  return function (f) {
    return function (a) {
      return pred(a) ? f(a) : a;
    };
  };
};
```

## Object

### get

```js
var get = function get(prop) {
  return function (obj) {
    return obj[prop];
  };
};
```

### merge

```js
var merge = function merge(o1) {
  return function (o2) {
    var r = {};
    Object.keys(o1).forEach(function (prop) {
      return (r[prop] = o1[prop]);
    });
    Object.keys(o2).forEach(function (prop) {
      return (r[prop] = o2[prop]);
    });
    return r;
  };
};
```

## String

### append

```js
var append = function append(a) {
  return function (b) {
    return b + a;
  };
};
```

### prepend

```js
var prepend = function prepend(a) {
  return function (b) {
    return a + b;
  };
};
```

### test

```js
var test = function test(regex) {
  return function (text) {
    return regex.test(text);
  };
};
```

## Public domain license

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
