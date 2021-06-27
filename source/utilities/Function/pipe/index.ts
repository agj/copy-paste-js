export default (...fs) =>
  fs.reduce(
    (left, right) =>
      (...args) =>
        right(left(...args))
  );
