export default (list) => {
  const seen = [];
  return list.filter((item) =>
    seen.some((a) => a === item) ? false : (seen.push(item), true)
  );
};
