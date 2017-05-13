
Copy&Paste JS
=============

A collection of javascript utilities designed for copy & pasting into your project, for when it's impractical or undesirable to depend on external modules. Most of these are compact yet readable one-liners. The design of these utilities focuses on function composition. All are properly spec-tested, and released into the public domain (see bottom of this file).


## The utilities

The following adhere to the ES2015 standard, to use in modern browsers or up-to-date versions of Node. For ES5 (backward-compatible) utilities, [see the `es5.md` file.](es5.md)


I apologize for the fact that there is currently no documentation for these utilities. For now you may check the specs in the `src/utilities/[group]/[utility]/test.js` files to see how they are used.


### Object

#### get

```js
const get = prop => obj => obj[prop];
```

#### merge

```js
const merge = o1 => o2 => {
	var r = {};
	Object.keys(o1).forEach(prop => r[prop] = o1[prop]);
	Object.keys(o2).forEach(prop => r[prop] = o2[prop]);
	return r;
};
```

### Array

#### every

```js
const every = p => list => list.every(p);
```

#### isIn

```js
const isIn = list => obj => list.some(a => a === obj);
```

#### some

```js
const some = p => list => list.some(p);
```

#### uniq

```js
const uniq = list => {
	const seen = [];
	return list.filter(item => seen.some(a => a === item) ? false : (seen.push(item), true));
};
```

### String

#### append

```js
const append = a => b => b + a;
```

#### prepend

```js
const prepend = a => b => a + b;
```

#### test

```js
const test = regex => text => regex.test(text);
```

### Function

#### after

```js
const after = (secs, fn) => setTimeout(fn, secs * 1000);
```

#### alternate

```js
const alternate = (f, g) => {
	let state = false;
	return (...args) => {
		state = !state;
		return state ? f(...args) : g(...args);
	};
};
```

#### apply

```js
const apply = f => (args) => f(...args);
```

#### call

```js
const call = f => (...args) => f(...args);
```

#### callMethod

```js
const callMethod = (method, ...args) => obj => obj[method](...args);
```

#### counter

```js
const counter = () => { let i = 0; return () => i++ };
```

#### debounce

```js
const debounce = (secs, fn) => {
	const delay = secs * 1000;
	let timeoutID;
	const exec = (args) => fn.apply(null, args);
	return (...args) => {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(exec, delay, args);
	};
};
```

#### log

```js
const log = (...msg) => () => console.log.apply(console, msg);
```

#### partial

```js
const partial = (f, args1) => (...args2) => f.apply(null, args1.concat(args2));
```

#### partialR

```js
const partialR = (f, args1) => (...args2) => f.apply(null, args2.concat(args1));
```

#### pipe

```js
const pipe = (...fs) => fs.reduce((left, right) => (...args) => right(left(...args)));
```

#### throttle

```js
const throttle = (secs, fn) => {
	const interval = secs * 1000;
	let last = 0;
	return (...args) => {
		const now = Date.now();
		if (now > last + interval) {
			last = now;
			fn(...args);
		}
	};
};
```

### Logic

#### eq

```js
const eq = a => b => b === a;
```

#### gt

```js
const gt = a => b => b > a;
```

#### gte

```js
const gte = a => b => b >= a;
```

#### lt

```js
const lt = a => b => b < a;
```

#### lte

```js
const lte = a => b => b <= a;
```

#### not

```js
const not = f => (...args) => !f(...args);
```

### Browser

#### makeEl

```js
const makeEl = (tag, attrs, ...children) => {
	const el = document.createElement(tag);
	if (attrs) Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
	children.map(obj => typeof obj === 'string' ? document.createTextNode(obj) : obj)
		.forEach(node => el.appendChild(node));
	return el;
};
```

#### onLoad

```js
const onLoad = cb => /interactive|complete/.test(document.readyState) ? setTimeout(cb, 0) : document.addEventListener('DOMContentLoaded', cb);
```

#### sel

```js
const sel = document.querySelector.bind(document);
```

#### selAll

```js
const selAll = document.querySelectorAll.bind(document);
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
