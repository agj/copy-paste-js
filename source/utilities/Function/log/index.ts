export const log =
  (...msg) =>
  () =>
    console.log.apply(console, msg);
