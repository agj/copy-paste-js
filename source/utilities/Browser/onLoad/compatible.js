module.exports = function onLoad(cb) {
  /interactive|complete/.test(document.readyState)
    ? setTimeout(cb, 0)
    : document.addEventListener("DOMContentLoaded", cb, {
        once: true,
      });
};
