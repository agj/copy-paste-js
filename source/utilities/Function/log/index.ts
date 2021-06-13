export default (...msg) =>
  () =>
    console.log.apply(console, msg);
