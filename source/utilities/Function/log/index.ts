export default (...msg: any) =>
  (arg?: any) => {
    console.log.apply(console, arg === undefined ? msg : [...msg, arg]);
    return arg;
  };
