# Copy&Paste JS 📋

A collection of small, stand-alone JavaScript (and TypeScript) utilities designed for copy-pasting into your project, for whenever it's impractical or undesirable to depend on external utility libraries such as [Ramda][ramda] or [Lodash][lodash]. A good use case is [userscripts][userscripts]! The design of these utilities is focused on function composition—many functions return other functions that take more arguments. All of the code is released onto the public domain.

This is still a work in (slow) progress. Some caveats:

- Not every utility has a proper explanation of what it does, and no examples of use are provided.
- The TypeScript versions don't all have type declarations yet.
- Although there's unit tests for every utility, most still require improvements.

[ramda]: https://ramdajs.com/
[lodash]: https://lodash.com/
[userscripts]: https://en.wikipedia.org/wiki/Userscript

## The utilities

Follow the link to the version you need:

- [Compatible JavaScript (ES5)](./compatible-js.md)
- [Modern JavaScript (for up-to-date browsers/runtimes)](./modern-js.md)
- [TypeScript](./typescript.md)
