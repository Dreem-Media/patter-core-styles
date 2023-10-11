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
  const bodyTag = document.body ?? document.getElementsByTagName('body')[0];


  function onScroll() {
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      lastScrollY = Math.max(window.scrollY, document.documentElement.scrollTop, bodyTag.scrollTop);
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {

    // Set body 'scrolled' class past header on/off
    if (lastScrollY > 100) {
      bodyTag.classList.add(scrolledClassName);
    } else {
      bodyTag.classList.remove(scrolledClassName);
    }

    // Set a "scrolled amount"
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const ratio = (lastScrollY / scrollHeight) * 5;
    bodyTag.style.setProperty("--scroll", (Math.min(Math.max(ratio, 0), 5)).toString());

    // Reset timer
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, false);

});
