import { DOMReady } from "./_utils";

DOMReady(() => {

  // Mobile menu toggle
  const burger = document.getElementById('burger'),
    mobileNav = document.getElementById('m-nav'),
    body = document.body;

  burger?.addEventListener('click', function (e) {
    this.classList.toggle('is-open');
    mobileNav?.classList.toggle('is-open');
    body.classList.toggle('m-nav-is-open');

    if (mobileNav.classList.contains('is-open')) {
      const mobileMenuLinks = mobileNav.getElementsByTagName('a');
      if (mobileMenuLinks.length) {
        setTimeout(() => mobileMenuLinks[0].focus(), 200);
      }
    }

  });

  // General Menu - Submenu
  const submenuActiveClass = 'submenu-active';
  const nav_links = document.querySelectorAll('li.menu-item-has-children > a');
  nav_links?.forEach(link => {
    link.addEventListener('click', (e) => {
      triggerMobileNavigationClose();
      e.stopPropagation();
      e.preventDefault();
      const wrapperNav = link.closest('nav');
      // Add styles
      wrapperNav?.classList.toggle(submenuActiveClass);
      link.parentNode?.classList.toggle(submenuActiveClass);
    });
  });

  // Mobile Menu 
  const mob_nav_links = document.querySelectorAll('li.menu-item-has-children > a');
  mob_nav_links?.forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const subMenu = link.nextElementSibling;
      var subMenuContentInner = subMenu.children[0].offsetHeight;
      if (subMenu.offsetHeight === 0) {
        subMenu.style.height = `${subMenuContentInner}px`;
      } else {
        subMenu.style.height = 0;
      }
    });
  });

  // Remove active menu states
  function triggerMobileNavigationClose(e) {
    const elements = document.querySelectorAll(`.${submenuActiveClass}`);
    const elements_subwrap = document.querySelectorAll(`.sub-menu-wrap`);
    elements.forEach(el => { el.classList.remove(submenuActiveClass) });
    elements_subwrap.forEach(el => { el.style.height = 0; });
  }
  body.addEventListener('click', triggerMobileNavigationClose);

});
