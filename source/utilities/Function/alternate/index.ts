export default (f, g) => {
  let state = false;
  return (...args) => {
    state = !state;
    return state ? f(...args) : g(...args);
  };
};
