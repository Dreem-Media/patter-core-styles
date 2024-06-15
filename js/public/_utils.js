export function DOMReady(callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
}

export function DomElementReady(selector, callback, timeout = 10000) {
  const checkElement = () => {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
      return true;
    }
    return false;
  };

  if (checkElement()) return;

  const observer = new MutationObserver(() => {
    if (checkElement()) {
      observer.disconnect();
      clearTimeout(timeoutId);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  const timeoutId = setTimeout(() => {
    observer.disconnect();
  }, timeout);
}

export function patter_debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
