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
  const headerScrolledClassName = 'header--scrolled';
  const bodyTag = document.body ?? document.getElementsByTagName('body')[0];
  const headerTag = document.querySelector('.header');

  let lastScrollY = 0;
  let ticking = false;
  let overlayTopValue = 100;

  // Threshold for header--scrolled class (can be overridden via CSS custom property)
  const HEADER_SCROLL_THRESHOLD = 50;

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

    // Header scroll state - adds header--scrolled class for transparent-to-solid header effect
    if (headerTag) {
      const shouldBeScrolled = lastScrollY > HEADER_SCROLL_THRESHOLD;
      const isCurrentlyScrolled = headerTag.classList.contains(headerScrolledClassName);

      if (shouldBeScrolled !== isCurrentlyScrolled) {
        headerTag.classList.toggle(headerScrolledClassName, shouldBeScrolled);

        // Dispatch custom event for themes to hook into
        window.dispatchEvent(new CustomEvent('headerScrollStateChange', {
          detail: { scrolled: shouldBeScrolled, scrollY: lastScrollY }
        }));
      }
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
  update(); // Check initial scroll position (for page refresh mid-scroll)
});
