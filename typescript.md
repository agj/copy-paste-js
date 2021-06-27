# Copy&Paste JS - TypeScript

These are TypeScript utilities apt for transpilation into JavaScript. [For other versions and more information, check here.](./README.md)

## Array

### every

```ts
const every = (p) => (list) => list.every(p);
```

### isIn

```ts
const isIn = (list) => (obj) => list.some((a) => a === obj);
```

### some

```ts
const some = (p) => (list) => list.some(p);
```

### uniq

```ts
const uniq = (list) => {
  const seen = [];
  return list.filter((item) =>
    seen.some((a) => a === item) ? false : (seen.push(item), true)
  );
};
```

### zip

```ts
const zip =
  <R>(right: R[]) =>
  <L>(left: L[]): [L, R][] =>
    left.map((l, i) => [l, right[i]]);
```

## Browser

### makeEl

```ts
const makeEl = (
  tag: string,
  attrs: Record<string, string>,
  ...children: Array<HTMLElement | string>
) => {
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

### onChanged

```ts
const onChanged = (el: HTMLElement, cb: MutationCallback): (() => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(el, { childList: true, subtree: true });
  return observer.disconnect.bind(observer);
};
```

### onLoad

```ts
const onLoad = (cb: () => any) =>
  /interactive|complete/.test(document.readyState)
    ? setTimeout(cb, 0)
    : document.addEventListener("DOMContentLoaded", cb, { once: true });
```

### sel

```ts
const sel = document.querySelector.bind(document);
```

### selAll

```ts
const selAll = document.querySelectorAll.bind(document);
```

## Function

### alternate

```ts
const alternate = (f, g) => {
  let state = false;
  return (...args) => {
    state = !state;
    return state ? f(...args) : g(...args);
  };
};
```

### apply

```ts
const apply = (f) => (args) => f(...args);
```

### call

```ts
const call =
  (f) =>
  (...args) =>
    f(...args);
```

### callMethod

```ts
const callMethod =
  <
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

```ts
const counter = () => {
  let i = 0;
  return () => i++;
};
```

### debounce

```ts
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

```ts
const delay = (secs) => (fn) => setTimeout(fn, secs * 1000);
```

### log

```ts
const log =
  (...msg: any) =>
  (arg?: any) => {
    console.log.apply(console, arg === undefined ? msg : [...msg, arg]);
    return arg;
  };
```

### partial

```ts
const partial =
  (f, args1) =>
  (...args2) =>
    f.apply(null, args1.concat(args2));
```

### partialR

```ts
const partialR =
  (f, args1) =>
  (...args2) =>
    f.apply(null, args2.concat(args1));
```

### pipe

```ts
const pipe = (...fs) =>
  fs.reduce(
    (left, right) =>
      (...args) =>
        right(left(...args))
  );
```

### throttle

```ts
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

```ts
const complement =
  (f) =>
  (...args) =>
    !f(...args);
```

### eq

```ts
const eq = (a) => (b) => b === a;
```

### gt

```ts
const gt = (a) => (b) => b > a;
```

### gte

```ts
const gte = (a) => (b) => b >= a;
```

### lt

```ts
const lt = (a) => (b) => b < a;
```

### lte

```ts
const lte = (a) => (b) => b <= a;
```

### not

```ts
const not = (a) => !a;
```

### unless

```ts
const unless = (pred) => (f) => (a) => pred(a) ? a : f(a);
```

### when

```ts
const when = (pred) => (f) => (a) => pred(a) ? f(a) : a;
```

## Object

### get

```ts
const get = (prop) => (obj) => obj[prop];
```

### merge

```ts
const merge = (o1) => (o2) => {
  var r = {};
  Object.keys(o1).forEach((prop) => (r[prop] = o1[prop]));
  Object.keys(o2).forEach((prop) => (r[prop] = o2[prop]));
  return r;
};
```

## String

### append

```ts
const append = (right) => (left) => left + right;
```

### prepend

```ts
const prepend = (left) => (right) => left + right;
```

### test

```ts
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
