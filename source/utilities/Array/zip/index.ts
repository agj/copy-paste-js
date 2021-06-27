export default <L, R>(left: L[], right: R[]): [L, R][] =>
  left.map((l, i) => [l, right[i]]);
