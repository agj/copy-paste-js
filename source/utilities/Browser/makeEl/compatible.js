module.exports = function makeEl(tag, attrs) {
  var el = document.createElement(tag);
  if (attrs)
    Object.keys(attrs).forEach(function (attr) {
      return el.setAttribute(attr, attrs[attr]);
    });
  for (var i = 2, len = arguments.length, child; i < len; i++) {
    child = arguments[i];
    el.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  }
  return el;
};
