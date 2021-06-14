# Copy&Paste JS - TypeScript

These are TypeScript utilities apt for transpilation into JavaScript. [For other versions and more information, check here.](./README.md)



## Array

### every

```
const every = (p) => (list) => list.every(p);

```

### isIn

```
const isIn = (list) => (obj) => list.some((a) => a === obj);

```

### some

```
const some = (p) => (list) => list.some(p);

```

### uniq

```
const uniq = (list) => {
  const seen = [];
  return list.filter((item) =>
    seen.some((a) => a === item) ? false : (seen.push(item), true)
  );
};

```


## Browser

### makeEl

```
const makeEl = (tag, attrs, ...children) => {
  const el = document.createElement(tag);
  if (attrs)
    Object.keys(attrs).forEach((attr) => el.setAttribute(attr, attrs[attr]));
  children
    .map((obj) =>
      typeof obj === "string" ? document.createTextNode(obj) : obj
    )
    .forEach((node) => el.appendChild(node));
  return el;
};

```

### onLoad

```
const onLoad = (cb) =>
  /interactive|complete/.test(document.readyState)
    ? setTimeout(cb, 0)
    : document.addEventListener("DOMContentLoaded", cb, { once: true });

```

### sel

```
const sel = document.querySelector.bind(document);

```

### selAll

```
const selAll = document.querySelectorAll.bind(document);

```


## Function

### alternate

```
const alternate = (f, g) => {
  let state = false;
  return (...args) => {
    state = !state;
    return state ? f(...args) : g(...args);
  };
};

```

### apply

```
const apply = (f) => (args) => f(...args);

```

### call

```
const call = (f) =>
  (...args) =>
    f(...args);

```

### callMethod

```
const callMethod = <
    Key extends string | number | symbol,
    Arg,
    Res,
    Obj extends Record<Key, (...args: Array<Arg>) => Res>
  >(
    method: Key,
    args?: Array<Arg>
  ) =>
  (obj: Obj): Res =>
    args ? obj[method](...args) : obj[method]();

```

### counter

```
const counter = () => {
  let i = 0;
  return () => i++;
};

```

### debounce

```
const debounce = <T>(secs: number, fn: (...args: Array<T>) => unknown) => {
  const delay = secs * 1000;
  let timeoutID;
  const exec = (args: Array<T>) => fn.apply(null, args);
  return (...args: Array<T>): void => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(exec, delay, args);
  };
};

```

### delay

```
const delay = (secs) => (fn) => setTimeout(fn, secs * 1000);

```

### log

```
const log = (...msg: any) =>
  (arg?: any) => {
    console.log.apply(console, arg === undefined ? msg : [...msg, arg]);
    return arg;
  };

```

### partial

```
const partial = (f, args1) =>
  (...args2) =>
    f.apply(null, args1.concat(args2));

```

### partialR

```
const partialR = (f, args1) =>
  (...args2) =>
    f.apply(null, args2.concat(args1));

```

### pipe

```
const pipe = (...fs) =>
  fs.reduce(
    (left, right) =>
      (...args) =>
        right(left(...args))
  );

```

### throttle

```
const throttle = <T>(secs: number, fn: (...args: Array<T>) => unknown) => {
  const waitTime = secs * 1000;
  let last = 0;
  return (...args: Array<T>): void => {
    const now = Date.now();
    if (now > last + waitTime) {
      last = now;
      fn(...args);
    }
  };
};

```


## Logic

### complement

```
const complement = (f) =>
  (...args) =>
    !f(...args);

```

### eq

```
const eq = (a) => (b) => b === a;

```

### gt

```
const gt = (a) => (b) => b > a;

```

### gte

```
const gte = (a) => (b) => b >= a;

```

### lt

```
const lt = (a) => (b) => b < a;

```

### lte

```
const lte = (a) => (b) => b <= a;

```

### not

```
const not = (a) => !a;

```

### unless

```
const unless = (pred) => (f) => (a) => pred(a) ? a : f(a);

```

### when

```
const when = (pred) => (f) => (a) => pred(a) ? f(a) : a;

```


## Object

### get

```
const get = (prop) => (obj) => obj[prop];

```

### merge

```
const merge = (o1) => (o2) => {
  var r = {};
  Object.keys(o1).forEach((prop) => (r[prop] = o1[prop]));
  Object.keys(o2).forEach((prop) => (r[prop] = o2[prop]));
  return r;
};

```


## String

### append

```
const append = (a) => (b) => b + a;

```

### prepend

```
const prepend = (a) => (b) => a + b;

```

### test

```
const test = (regex) => (text) => regex.test(text);

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
