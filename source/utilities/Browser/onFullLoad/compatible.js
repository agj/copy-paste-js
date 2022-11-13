module.exports = function onFullLoad(cb) {
  /complete/.test(document.readyState)
    ? setTimeout(cb, 0)
    : window.addEventListener("load", cb, {
        once: true,
      });
};
