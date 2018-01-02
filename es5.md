
Copy&Paste JS
=============

A collection of javascript utilities designed for copy & pasting into your project, for when it's impractical or undesirable to depend on external modules. Most of these are compact yet readable one-liners. The design of these utilities focuses on function composition. All are properly spec-tested, and released into the public domain (see bottom of this file).


## The utilities


The following adhere to the ES5 standard, for compatibility with environments that might not be up-to-date. For ES2015 utilities, [see the `README.md` file.](README.md)

I apologize for the fact that there is currently no documentation for these utilities. For now you may check the specs in the `src/utilities/[group]/[utility]/test.js` files to see how they are used.


### Object

#### get

```js
var get = function get(prop) {
  return function (obj) {
    return obj[prop];
  };
};
```

#### merge

```js
var merge = function merge(o1) {
	return function (o2) {
		var r = {};
		Object.keys(o1).forEach(function (prop) {
			return r[prop] = o1[prop];
		});
		Object.keys(o2).forEach(function (prop) {
			return r[prop] = o2[prop];
		});
		return r;
	};
};
```

### Array

#### every

```js
var every = function every(p) {
  return function (list) {
    return list.every(p);
  };
};
```

#### isIn

```js
var isIn = function isIn(list) {
  return function (obj) {
    return list.some(function (a) {
      return a === obj;
    });
  };
};
```

#### some

```js
var some = function some(p) {
  return function (list) {
    return list.some(p);
  };
};
```

#### toArray

```js
var toArray = Function.prototype.call.bind([].slice);
```

#### uniq

```js
var uniq = function uniq(list) {
	var seen = [];
	return list.filter(function (item) {
		return seen.some(function (a) {
			return a === item;
		}) ? false : (seen.push(item), true);
	});
};
```

### String

#### append

```js
var append = function append(a) {
  return function (b) {
    return b + a;
  };
};
```

#### prepend

```js
var prepend = function prepend(a) {
  return function (b) {
    return a + b;
  };
};
```

#### test

```js
var test = function test(regex) {
  return function (text) {
    return regex.test(text);
  };
};
```

### Function

#### alternate

```js
var alternate = function alternate(f, g) {
	var state = false;
	return function () {
		state = !state;
		return state ? f.apply(undefined, arguments) : g.apply(undefined, arguments);
	};
};
```

Alternately executes functions `f` and `g` upon each call.

#### apply

```js
var apply = function apply(f) {
	return function (args) {
		return f.apply(null, args);
	};
};
```

Returns a function that will take an array of arguments to call function `f` with.

#### call

```js
var call = function call(f) {
  return function () {
    return f.apply(undefined, arguments);
  };
};
```

Returns a function that will call function `f` with any arguments supplied.

#### callMethod

```js
var callMethod = function callMethod(method, args) { return function (obj) { return args ? obj[method].apply(obj, args) : obj[method]() } };
```

Takes a method name `method` and a list of arguments `args`, and returns a function that upon execution will take an object `obj` and call whatever method `method` in it with arguments `args`.

#### counter

```js
var counter = function counter() {
  var i = 0;return function () {
    return i++;
  };
};
```

Returns a function that upon each execution will return a number that is 1 greater than the last time, starting with 0.

#### debounce

```js
var debounce = function debounce(secs, fn) {
	var delay = secs * 1000;
	var timeoutID = undefined;
	var exec = function exec(args) {
		return fn.apply(null, args);
	};
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		clearTimeout(timeoutID);
		timeoutID = setTimeout(exec, delay, args);
	};
};
```

Takes a delay in seconds `secs` and a function `fn`, and returns a function that calls `fn` only after `secs` have passed without having been invoked. Useful, for instance, to make sure repeated changes executed in a small space of time don't cause too many expensive computations, and only when done perform a calculation.

#### delay

```js
var delay = function (secs) { return function (fn) { setTimeout(fn, secs * 1000) } };
```

Takes a delay in seconds `secs`, and returns a function that takes any function `fn` and executes it only after `secs` have elapsed.

#### log

```js
var log = function log() {
  for (var _len = arguments.length, msg = Array(_len), _key = 0; _key < _len; _key++) {
    msg[_key] = arguments[_key];
  }

  return function () {
    return console.log.apply(console, msg);
  };
};
```

Takes a list of arguments `msg`, and returns a function that takes no arguments, but upon execution logs `msg` in the console.

#### partial

```js
var partial = function partial(f, args1) {
  return function () {
    return f.apply(null, args1.concat([].slice.call(arguments)));
  };
};
```

Takes a function `f` and a list of arguments `args1`, and returns a function that will invoke `f` with `args1` plus any other arguments passed to it.

#### partialR

```js
var partialR = function partialR(f, args1) {
  return function () {
    for (var _len = arguments.length, args2 = Array(_len), _key = 0; _key < _len; _key++) {
      args2[_key] = arguments[_key];
    }

    return f.apply(null, args2.concat(args1));
  };
};
```

Takes a function `f` and a list of arguments `args1`, and returns a function that will invoke `f` with any arguments passed to it plus `args1` to its right.

#### pipe

```js
var pipe = function pipe() {
  for (var _len = arguments.length, fs = Array(_len), _key = 0; _key < _len; _key++) {
    fs[_key] = arguments[_key];
  }

  return fs.reduce(function (left, right) {
    return function () {
      return right(left.apply(undefined, arguments));
    };
  });
};
```

Takes any number of functions, and returns a function that will execute them from left to right, passing the return value of one as the input to the next.

#### throttle

```js
var throttle = function throttle(secs, fn) {
	var interval = secs * 1000;
	var last = 0;
	return function () {
		var now = Date.now();
		if (now > last + interval) {
			last = now;
			fn.apply(undefined, arguments);
		}
	};
};
```

Takes a delay `secs` and a function `fn`, and returns a function that will call `fn` once and ignore all subsequent calls until `secs` have elapsed.

### Logic

#### complement

```js
var complement = function (f) { return function () { return !f.apply(undefined, arguments) } };
```

Takes a function `f` and returns a function that returns the boolean opposite of the value that `f` would return for the same arguments.

#### eq

```js
var eq = function eq(a) {
  return function (b) {
    return b === a;
  };
};
```

Takes a value `a`, and returns a function that returns whether argument `b` is strictly equal to `a`.

#### gt

```js
var gt = function gt(a) {
  return function (b) {
    return b > a;
  };
};
```

Takes a value `a`, and returns a function that returns whether argument `b` is greater than `a`.

#### gte

```js
var gte = function gte(a) {
  return function (b) {
    return b >= a;
  };
};
```

Takes a value `a`, and returns a function that returns whether argument `b` is greater than or equal to `a`.

#### lt

```js
var lt = function lt(a) {
  return function (b) {
    return b < a;
  };
};
```

Takes a value `a`, and returns a function that returns whether argument `b` is less than `a`.

#### lte

```js
var lte = function lte(a) {
  return function (b) {
    return b <= a;
  };
};
```

Takes a value `a`, and returns a function that returns whether argument `b` is less than or equal to `a`.

#### not

```js
var not = function (a) { return !a };
```

Returns the boolean opposite of the argument passed.

#### unless

```js
var unless = function (pred) { return function (f) { return function (a) { return pred(a) ? a : f(a) } } };
```

If predicate function `pred` returns a **falsy** value when passed `a`, the return value will be `f(a)`, otherwise `a`.

#### when

```js
var when = function (pred) { return function (f) { return function (a) { return pred(a) ? f(a) : a } } };
```

If predicate function `pred` returns a **truthy** value when passed `a`, the return value will be `f(a)`, otherwise `a`.

### Browser

#### makeEl

```js
var makeEl = function makeEl(tag, attrs) {
	var children = [].slice.call(arguments, 2);
	var el = document.createElement(tag);
	if (attrs) Object.keys(attrs).forEach(function (attr) { el.setAttribute(attr, attrs[attr]) });
	children.map(function (obj) {
		return typeof obj === 'string' ? document.createTextNode(obj) : obj;
	}).forEach(function (node) { el.appendChild(node) });
	return el;
};
```

Creates an element with the supplied tag name, attributes (defined in an object), and children. Can be used nested to create a tree.

#### onLoad

```js
var onLoad = function (cb) { return /interactive|complete/.test(document.readyState) ? setTimeout(cb, 0) : document.addEventListener('DOMContentLoaded', cb) };
```

Executes the supplied function as soon as the DOM is ready.

#### sel

```js
var sel = document.querySelector.bind(document);
```

Returns the first element in the document that matches the given a CSS selector.

#### selAll

```js
var selAll = document.querySelectorAll.bind(document);
```

Returns a list of all elements that match the provided CSS selector.


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
