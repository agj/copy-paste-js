export default (el: Element, cb: MutationCallback): (() => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(el, { childList: true, subtree: true });
  return observer.disconnect.bind(observer);
};
