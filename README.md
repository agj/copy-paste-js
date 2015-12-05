
copy-paste-js
=============

A collection of javascript (ES2015 standard) utilities designed for copy+pasting into your project, when it's impractical or undesirable to depend on external modules. Most of these are compact yet readable one-liners.


## The utilities

### Object

```js
const get = prop => obj => obj[prop];
```


### Array

```js
const uniq = list => {
    const seen = [];
    return list.filter(item => seen.some(eq(item)) ? false : (seen.push(item), true));
};

const some = p => list => list.some(p);

const any = p => list => list.any(p);

const isIn = list => obj => list.some(a => a === obj);
```


### String

```js
const prepend = a => b => a + b;

const append = a => b => b + a;

const test = regex => text => regex.test(text);
```


### Function

```js
const call = f => (...args) => f(...args);

const apply = f => args => f(...args);

const callMethod = (method, ...args) => obj => obj[method](...args);

const pipe = (...fs) => fs.reduce((left, right) => (...args) => right(left(...args)));

const alternate = (f, g) => {
    let state = false;
    return (...args) => {
        state = !state;
        return state ? f(...args) : g(...args);
    };
};
```


### Logic

```js
const eq = a => b => b === a;

const lt = a => b => b < a;

const lte = a => b => b <= a;

const gt = a => b => b > a;

const gte = a => b => b >= a;

const not = f => (...args) => !f(...args);
```


### DOM

```js
const onLoad = cb => /interactive|complete/.test(document.readyState) ? setTimeout(cb, 0) : document.addEventListener('DOMContentLoaded', cb);

const sel = document.querySelector.bind(document);

const selAll = document.querySelectorAll.bind(document);

const makeEl = (tag, attrs, ...children) => {
    const el = document.createElement(tag);
    if (attrs)
        Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
    children.map(obj => typeof obj === 'string' ? document.createTextNode(obj) : obj).forEach(node => el.appendChild(node));
    return el;
};
```


## License

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

For more information, please refer to <http://unlicense.org>

