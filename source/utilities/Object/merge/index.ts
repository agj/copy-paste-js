export default (o1) => (o2) => {
  var r = {};
  Object.keys(o1).forEach((prop) => (r[prop] = o1[prop]));
  Object.keys(o2).forEach((prop) => (r[prop] = o2[prop]));
  return r;
};
