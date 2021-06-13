export default (method, args) => (obj) =>
  args ? obj[method](...args) : obj[method]();
