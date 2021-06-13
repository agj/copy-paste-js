export default (tag, attrs, ...children) => {
  const el = document.createElement(tag);
  if (attrs)
    Object.keys(attrs).forEach((attr) => el.setAttribute(attr, attrs[attr]));
  children
    .map((obj) =>
      typeof obj === "string" ? document.createTextNode(obj) : obj
    )
    .forEach((node) => el.appendChild(node));
  return el;
};
