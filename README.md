
Copy&Paste JS
=============

A collection of javascript utilities designed for copy & pasting into your project, for when it's impractical or undesirable to depend on external modules. Most of these are compact yet readable one-liners.


## The utilities

The following adhere to the ES2015 standard. For ES5 utilities, [see the `es5.md` file.](es5.md)


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


## License

Copyright 2015 agj

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

