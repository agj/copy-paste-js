export default <R>(right: R[]) =>
  <L>(left: L[]): [L, R][] =>
    left.map((l, i) => [l, right[i]]);
