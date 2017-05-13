
Copy&Paste JS
=============

A collection of javascript utilities designed for copy & pasting into your project, for when it's impractical or undesirable to depend on external modules. Most of these are compact yet readable one-liners.


## The utilities


The following adhere to the ES5 standard. For ES2015 utilities, [see the `README.md` file.](README.md)

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

#### after

```js
var after = function after(secs, fn) {
  return setTimeout(fn, secs * 1000);
};
```

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

#### apply

```js
var apply = function apply(f) {
	return function (args) {
		return f.apply(null, args);
	};
};
```

#### call

```js
var call = function call(f) {
  return function () {
    return f.apply(undefined, arguments);
  };
};
```

#### callMethod

```js
var callMethod = function callMethod(method) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function (obj) {
    return obj[method].apply(obj, args);
  };
};
```

#### counter

```js
var counter = function counter() {
  var i = 0;return function () {
    return i++;
  };
};
```

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

#### partial

```js
var partial = function partial(f, args1) {
  return function () {
    return f.apply(null, args1.concat([].slice.call(arguments)));
  };
};
```

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

### Logic

#### eq

```js
var eq = function eq(a) {
  return function (b) {
    return b === a;
  };
};
```

#### gt

```js
var gt = function gt(a) {
  return function (b) {
    return b > a;
  };
};
```

#### gte

```js
var gte = function gte(a) {
  return function (b) {
    return b >= a;
  };
};
```

#### lt

```js
var lt = function lt(a) {
  return function (b) {
    return b < a;
  };
};
```

#### lte

```js
var lte = function lte(a) {
  return function (b) {
    return b <= a;
  };
};
```

#### not

```js
var not = function not(f) {
  return function () {
    return !f.apply(undefined, arguments);
  };
};
```

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

#### onLoad

```js
var onLoad = function (cb) { return /interactive|complete/.test(document.readyState) ? setTimeout(cb, 0) : document.addEventListener('DOMContentLoaded', cb) };
```

#### sel

```js
var sel = document.querySelector.bind(document);
```

#### selAll

```js
var selAll = document.querySelectorAll.bind(document);
```


## License

Copyright 2015 agj

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

