export const used = (func, obj) => (func(obj), obj);

export const appendChildren = (el, children) =>
  children?.forEach(child => {
    if (child === null || child === undefined || child === false) {
      return;
    }
    if (Array.isArray(child)) {
      appendChildren(el, child);
      return;
    }
    el.appendChild(typeof child === 'object' ? child : document.createTextNode(String(child)));
  });

export const __ = (tagName, attrs = {}, children) => {
  const el = Object.assign(document.createElement(tagName), attrs);
  appendChildren(el, children);
  return el;
};
