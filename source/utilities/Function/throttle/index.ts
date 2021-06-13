export default (secs, fn) => {
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
