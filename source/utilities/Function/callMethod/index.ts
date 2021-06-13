export default <
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
