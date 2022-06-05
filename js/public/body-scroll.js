import { DOMReady } from "./_utils";

// Remove chrome scroll remember position
if ('scrollRestoration' in history) {
  // Back off, browser, I got this...
  history.scrollRestoration = 'manual';
}

DOMReady(() => {

  // Scroll
  let lastScrollY = 0;
  let ticking = false;
  const scrolledClassName = 'scrolled';
  const bodyTag = document.getElementsByTagName('body')[0];


  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    if (lastScrollY > 100) {
      bodyTag.classList.add(scrolledClassName);
    } else {
      bodyTag.classList.remove(scrolledClassName);
    }
    ticking = false;
  }
  window.addEventListener('scroll', onScroll, false);

});