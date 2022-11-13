# Copy&Paste JS 📋 – TypeScript

These are TypeScript utilities apt for transpilation into JavaScript. [For other versions and more information, check here.](./README.md)

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
  - [onFullLoad](#onfullload)
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

```ts
const every = (p) => (list) => list.every(p);
```

### `isIn`

```ts
const isIn = (list) => (obj) => list.some((a) => a === obj);
```

### `some`

```ts
const some = (p) => (list) => list.some(p);
```

### `uniq`

```ts
const uniq = (list) => {
  const seen = [];
  return list.filter((item) =>
    seen.some((a) => a === item) ? false : (seen.push(item), true)
  );
};
```

### `zip`

```ts
const zip =
  <R>(right: R[]) =>
  <L>(left: L[]): [L, R][] =>
    left.map((l, i) => [l, right[i]]);
```

## Browser

### `makeEl`

Creates an element with the supplied tag name, attributes (defined in an object), and children. Can be used nested to create a tree.

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

### `onChanged`

```ts
const onChanged = (el: HTMLElement, cb: MutationCallback): (() => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(el, { childList: true, subtree: true });
  return observer.disconnect.bind(observer);
};
```

### `onFullLoad`

Executes the supplied function as soon as the page is fully loaded.

```ts
const onFullLoad = (cb: () => any) =>
  /complete/.test(document.readyState)
    ? setTimeout(cb, 0)
    : window.addEventListener("load", cb, { once: true });
```

### `onLoad`

Executes the supplied function as soon as the DOM is ready.

```ts
const onLoad = (cb: () => any) =>
  /interactive|complete/.test(document.readyState)
    ? setTimeout(cb, 0)
    : document.addEventListener("DOMContentLoaded", cb, { once: true });
```

### `sel`

Returns the first element in the document that matches the given a CSS selector.

```ts
const sel = document.querySelector.bind(document);
```

### `selAll`

Returns a list of all elements that match the provided CSS selector.

```ts
const selAll = document.querySelectorAll.bind(document);
```

## Function

### `alternate`

Alternately executes functions `f` and `g` upon each call.

```ts
const alternate = (f, g) => {
  let state = false;
  return (...args) => {
    state = !state;
    return state ? f(...args) : g(...args);
  };
};
```

### `apply`

Returns a function that will take an array of arguments to call function `f` with.

```ts
const apply = (f) => (args) => f(...args);
```

### `call`

Returns a function that will call function `f` with any arguments supplied.

```ts
const call =
  (f) =>
  (...args) =>
    f(...args);
```

### `callMethod`

Takes a method name `method` and a list of arguments `args`, and returns a function that upon execution will take an object `obj` and call whatever method `method` in it with arguments `args`.

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

### `counter`

Returns a function that upon each execution will return a number that is 1 greater than the last time, starting with 0.

```ts
const counter = () => {
  let i = 0;
  return () => i++;
};
```

### `debounce`

Takes a delay in seconds `secs` and a function `fn`, and returns a function that calls `fn` only after `secs` have passed without having been invoked. Useful, for instance, to make sure repeated changes executed in a small space of time don't cause too many expensive computations, and only when done perform a calculation.

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

### `delay`

Takes a delay in seconds `secs`, and returns a function that takes any function `fn` and executes it only after `secs` have elapsed.

```ts
const delay = (secs) => (fn) => setTimeout(fn, secs * 1000);
```

### `log`

Takes a list of arguments `msg`, and returns a function that takes one argument `arg`, which it returns after logging `msg` and `arg` in the console.

```ts
const log =
  (...msg: any) =>
  (arg?: any) => {
    console.log.apply(console, arg === undefined ? msg : [...msg, arg]);
    return arg;
  };
```

### `partial`

Takes a function `f` and a list of arguments `args1`, and returns a function that will invoke `f` with `args1` plus any other arguments passed to it.

```ts
const partial =
  (f, args1) =>
  (...args2) =>
    f.apply(null, args1.concat(args2));
```

### `partialR`

Takes a function `f` and a list of arguments `args1`, and returns a function that will invoke `f` with any arguments passed to it plus `args1` to its right.

```ts
const partialR =
  (f, args1) =>
  (...args2) =>
    f.apply(null, args2.concat(args1));
```

### `pipe`

Takes any number of functions, and returns a function that will execute them from left to right, passing the return value of one as the input to the next.

```ts
const pipe = (...fs) =>
  fs.reduce(
    (left, right) =>
      (...args) =>
        right(left(...args))
  );
```

### `throttle`

Takes a delay `secs` and a function `fn`, and returns a function that will call `fn` once and ignore all subsequent calls until `secs` have elapsed.

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

### `complement`

Takes a function `f` and returns a function that returns the boolean opposite of the value that `f` would return for the same arguments.

```ts
const complement =
  (f) =>
  (...args) =>
    !f(...args);
```

### `eq`

Takes a value `a`, and returns a function that returns whether argument `b` is strictly equal to `a`.

```ts
const eq = (a) => (b) => b === a;
```

### `gt`

Takes a value `a`, and returns a function that returns whether argument `b` is greater than `a`.

```ts
const gt = (a) => (b) => b > a;
```

### `gte`

Takes a value `a`, and returns a function that returns whether argument `b` is greater than or equal to `a`.

```ts
const gte = (a) => (b) => b >= a;
```

### `lt`

Takes a value `a`, and returns a function that returns whether argument `b` is less than `a`.

```ts
const lt = (a) => (b) => b < a;
```

### `lte`

Takes a value `a`, and returns a function that returns whether argument `b` is less than or equal to `a`.

```ts
const lte = (a) => (b) => b <= a;
```

### `not`

Returns the boolean opposite of the argument passed.

```ts
const not = (a) => !a;
```

### `unless`

If predicate function `pred` returns a **falsy** value when passed `a`, the return value will be `f(a)`, otherwise `a`.

```ts
const unless = (pred) => (f) => (a) => pred(a) ? a : f(a);
```

### `when`

If predicate function `pred` returns a **truthy** value when passed `a`, the return value will be `f(a)`, otherwise `a`.

```ts
const when = (pred) => (f) => (a) => pred(a) ? f(a) : a;
```

## Object

### `get`

```ts
const get = (prop) => (obj) => obj[prop];
```

### `merge`

```ts
const merge = (o1) => (o2) => {
  var r = {};
  Object.keys(o1).forEach((prop) => (r[prop] = o1[prop]));
  Object.keys(o2).forEach((prop) => (r[prop] = o2[prop]));
  return r;
};
```

## String

### `append`

```ts
const append = (right) => (left) => left + right;
```

### `prepend`

```ts
const prepend = (left) => (right) => left + right;
```

### `test`

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
