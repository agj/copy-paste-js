# Copy&Paste JS - Compatible JavaScript

These are utilities that adhere to the ECMAScript 5 standard, for compatibility with environments that might not be up-to-date. [For other versions and more information, check here.](./README.md)

## Contents

- [Array](#array)
  - [every](#every)
  - [isIn](#isin)
  - [some](#some)
  - [uniq](#uniq)
  - [zip](#zip)
- [Browser](#browser)
  - [makeEl](#makeel)
  - [onChanged](#onchanged)
  - [onLoad](#onload)
  - [sel](#sel)
  - [selAll](#selall)
- [Function](#function)
  - [alternate](#alternate)
  - [apply](#apply)
  - [call](#call)
  - [callMethod](#callmethod)
  - [counter](#counter)
  - [debounce](#debounce)
  - [delay](#delay)
  - [log](#log)
  - [partial](#partial)
  - [partialR](#partialr)
  - [pipe](#pipe)
  - [throttle](#throttle)
- [Logic](#logic)
  - [complement](#complement)
  - [eq](#eq)
  - [gt](#gt)
  - [gte](#gte)
  - [lt](#lt)
  - [lte](#lte)
  - [not](#not)
  - [unless](#unless)
  - [when](#when)
- [Object](#object)
  - [get](#get)
  - [merge](#merge)
- [String](#string)
  - [append](#append)
  - [prepend](#prepend)
  - [test](#test)

## Array

### `every`

```js
var every = function (p) {
  return function (list) {
    return list.every(p);
  };
};
```

### `isIn`

```js
var isIn = function (list) {
  return function (obj) {
    return list.some(function (a) {
      return a === obj;
    });
  };
};
```

### `some`

```js
var some = function (p) {
  return function (list) {
    return list.some(p);
  };
};
```

### `uniq`

```js
var uniq = function (list) {
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

### `zip`

```js
var zip = function (right) {
  return function (left) {
    return left.map(function (l, i) {
      return [l, right[i]];
    });
  };
};
```

## Browser

### `makeEl`

Creates an element with the supplied tag name, attributes (defined in an object), and children. Can be used nested to create a tree.

```js
var makeEl = function (tag, attrs) {
  var el = document.createElement(tag);
  if (attrs)
    Object.keys(attrs).forEach(function (attr) {
      return el.setAttribute(attr, attrs[attr]);
    });
  for (var i = 2, len = arguments.length, child; i < len; i++) {
    child = arguments[i];
    el.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  }
  return el;
};
```

### `onChanged`

```js
var onChanged = function (el, cb) {
  var observer = new MutationObserver(cb);
  observer.observe(el, {
    childList: true,
    subtree: true,
  });
  return observer.disconnect.bind(observer);
};
```

### `onLoad`

Executes the supplied function as soon as the DOM is ready.

```js
var onLoad = function (cb) {
  /interactive|complete/.test(document.readyState)
    ? setTimeout(cb, 0)
    : document.addEventListener("DOMContentLoaded", cb, {
        once: true,
      });
};
```

### `sel`

Returns the first element in the document that matches the given a CSS selector.

```js
var sel = document.querySelector.bind(document);
```

### `selAll`

Returns a list of all elements that match the provided CSS selector.

```js
var selAll = document.querySelectorAll.bind(document);
```

## Function

### `alternate`

Alternately executes functions `f` and `g` upon each call.

```js
var alternate = function (f, g) {
  var state = false;
  return function () {
    state = !state;
    return state ? f.apply(void 0, arguments) : g.apply(void 0, arguments);
  };
};
```

### `apply`

Returns a function that will take an array of arguments to call function `f` with.

```js
var apply = function (f) {
  return function (args) {
    return f.apply(void 0, args);
  };
};
```

### `call`

Returns a function that will call function `f` with any arguments supplied.

```js
var call = function (f) {
  return function () {
    return f.apply(void 0, arguments);
  };
};
```

### `callMethod`

Takes a method name `method` and a list of arguments `args`, and returns a function that upon execution will take an object `obj` and call whatever method `method` in it with arguments `args`.

```js
var callMethod = function (method, args) {
  return function (obj) {
    return args ? obj[method].apply(obj, args) : obj[method]();
  };
};
```

### `counter`

Returns a function that upon each execution will return a number that is 1 greater than the last time, starting with 0.

```js
var counter = function () {
  var i = 0;
  return function () {
    return i++;
  };
};
```

### `debounce`

Takes a delay in seconds `secs` and a function `fn`, and returns a function that calls `fn` only after `secs` have passed without having been invoked. Useful, for instance, to make sure repeated changes executed in a small space of time don't cause too many expensive computations, and only when done perform a calculation.

```js
var debounce = function (secs, fn) {
  var delay = secs * 1000;
  var timeoutID;
  var exec = function (args) {
    return fn.apply(null, args);
  };
  return function () {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(exec, delay, arguments);
  };
};
```

### `delay`

Takes a delay in seconds `secs`, and returns a function that takes any function `fn` and executes it only after `secs` have elapsed.

```js
var delay = function (secs) {
  return function (fn) {
    return setTimeout(fn, secs * 1000);
  };
};
```

### `log`

Takes a list of arguments `msg`, and returns a function that takes one argument `arg`, which it returns after logging `msg` and `arg` in the console.

```js
var log = function () {
  var msg = [].slice.apply(arguments);
  return function (arg) {
    console.log.apply(console, arg === undefined ? msg : msg.concat([arg]));
    return arg;
  };
};
```

### `partial`

Takes a function `f` and a list of arguments `args1`, and returns a function that will invoke `f` with `args1` plus any other arguments passed to it.

```js
var partial = function (f, args1) {
  return function () {
    var args2 = [].slice.apply(arguments);
    return f.apply(null, args1.concat(args2));
  };
};
```

### `partialR`

Takes a function `f` and a list of arguments `args1`, and returns a function that will invoke `f` with any arguments passed to it plus `args1` to its right.

```js
var partialR = function (f, args1) {
  return function () {
    var args2 = [].slice.apply(arguments);
    return f.apply(null, args2.concat(args1));
  };
};
```

### `pipe`

Takes any number of functions, and returns a function that will execute them from left to right, passing the return value of one as the input to the next.

```js
var pipe = function () {
  var fs = [].slice.apply(arguments);
  return fs.reduce(function (left, right) {
    return function () {
      return right(left.apply(void 0, arguments));
    };
  });
};
```

### `throttle`

Takes a delay `secs` and a function `fn`, and returns a function that will call `fn` once and ignore all subsequent calls until `secs` have elapsed.

```js
var throttle = function (secs, fn) {
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

### `complement`

Takes a function `f` and returns a function that returns the boolean opposite of the value that `f` would return for the same arguments.

```js
var complement = function (f) {
  return function () {
    return !f.apply(void 0, arguments);
  };
};
```

### `eq`

Takes a value `a`, and returns a function that returns whether argument `b` is strictly equal to `a`.

```js
var eq = function (a) {
  return function (b) {
    return b === a;
  };
};
```

### `gt`

Takes a value `a`, and returns a function that returns whether argument `b` is greater than `a`.

```js
var gt = function (a) {
  return function (b) {
    return b > a;
  };
};
```

### `gte`

Takes a value `a`, and returns a function that returns whether argument `b` is greater than or equal to `a`.

```js
var gte = function (a) {
  return function (b) {
    return b >= a;
  };
};
```

### `lt`

Takes a value `a`, and returns a function that returns whether argument `b` is less than `a`.

```js
var lt = function (a) {
  return function (b) {
    return b < a;
  };
};
```

### `lte`

Takes a value `a`, and returns a function that returns whether argument `b` is less than or equal to `a`.

```js
var lte = function (a) {
  return function (b) {
    return b <= a;
  };
};
```

### `not`

Returns the boolean opposite of the argument passed.

```js
var not = function (a) {
  return !a;
};
```

### `unless`

If predicate function `pred` returns a **falsy** value when passed `a`, the return value will be `f(a)`, otherwise `a`.

```js
var unless = function (pred) {
  return function (f) {
    return function (a) {
      return pred(a) ? a : f(a);
    };
  };
};
```

### `when`

If predicate function `pred` returns a **truthy** value when passed `a`, the return value will be `f(a)`, otherwise `a`.

```js
var when = function (pred) {
  return function (f) {
    return function (a) {
      return pred(a) ? f(a) : a;
    };
  };
};
```

## Object

### `get`

```js
var get = function (prop) {
  return function (obj) {
    return obj[prop];
  };
};
```

### `merge`

```js
var merge = function (o1) {
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

### `append`

```js
var append = function (right) {
  return function (left) {
    return left + right;
  };
};
```

### `prepend`

```js
var prepend = function (left) {
  return function (right) {
    return left + right;
  };
};
```

### `test`

```js
var test = function (regex) {
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
