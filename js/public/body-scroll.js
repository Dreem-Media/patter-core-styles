import { DOMReady, patter_debounce } from "./_utils";

// // Remove chrome scroll remember position
// if ('scrollRestoration' in history) {
//   if (document.body?.classList.contains('scroll-history-manual')) {
//     // Back off, browser, I got this...
//     history.scrollRestoration = 'manual';
//   }
// }

DOMReady(() => {
  const scrolledClassName = 'scrolled-past-header';
  const scrolledInitClassName = 'scrolled';
  const bodyTag = document.body ?? document.getElementsByTagName('body')[0];

  let lastScrollY = 0;
  let ticking = false;
  let overlayTopValue = 100;

  const selectors = [".widget-area--site-wide-banner", "header.header", ".header__main_nav__mobile"];
  const elements = selectors.map(selector => document.querySelector(selector));
  const adminBar = document.getElementById('wpadminbar');

  function setOverlayTopHeight() {
    let totalHeight = 0;

    elements.forEach(element => {
      if (element) {
        totalHeight += element.offsetHeight;
      }
    });

    if (adminBar) {
      totalHeight += adminBar.offsetHeight;
    }

    overlayTopValue = totalHeight; // Update the global variable
    bodyTag.style.setProperty("--patter--header-area-size", `${totalHeight}px`);
  }

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
    // Add the 'scrolled-init' class as soon as the user scrolls and remove if back to top
    if (lastScrollY > 0) {
      bodyTag.classList.add(scrolledInitClassName);
    } else {
      bodyTag.classList.remove(scrolledInitClassName);
    }

    // Set body 'scrolled' class past header on/off using the CSS variable value
    if (lastScrollY > overlayTopValue) {
      bodyTag.classList.add(scrolledClassName);
    } else {
      bodyTag.classList.remove(scrolledClassName);
    }

    // // Set a "scrolled amount"
    // const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // const ratio = (lastScrollY / scrollHeight) * 5;
    // bodyTag.style.setProperty("--scroll", (Math.min(Math.max(ratio, 0), 5)).toString());

    // Reset timer
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, false);
  window.addEventListener('resize', patter_debounce(setOverlayTopHeight, 100));

  setOverlayTopHeight(); // Initial calculation on DOM ready
});
