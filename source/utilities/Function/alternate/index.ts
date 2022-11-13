export default <Args extends unknown[], Rf, Rg>(
  f: (...args: Args) => Rf,
  g: (...args: Args) => Rg
) => {
  let state = false;
  return (...args: Args): Rf | Rg => {
    state = !state;
    return state ? f(...args) : g(...args);
  };
};
