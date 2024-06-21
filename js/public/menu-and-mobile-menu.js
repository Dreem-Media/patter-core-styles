import { DOMReady } from "./_utils";

DOMReady(() => {
  const burger = document.getElementById("burger"),
    mobileNav = document.getElementById("m-nav"),
    body = document.body,
    pageTopWrapper = document.getElementById("top"),
    nav_links = document.querySelectorAll(
      "li.menu-item-has-children > a:first-child"
    ),
    allNavs = document.querySelectorAll("nav"),
    submenuActiveClass = "submenu-active";

  function cleanUpClasses() {
    const main_menu_elements_subwrap = document.querySelectorAll(
      `.menu--main .sub-menu-wrap`
    );
    main_menu_elements_subwrap.forEach((el) => {
      el.style.height = 0;
    });
    const m_menu_elements_subwrap = document.querySelectorAll(
      `.m-nav-style--skew .sub-menu-wrap, .m-nav-style--overlay .sub-menu-wrap`
    );
    m_menu_elements_subwrap.forEach((el) => {
      el.style.height = 0;
    });
    allNavs?.forEach((nav) => {
      nav?.classList.remove(`has-${submenuActiveClass}`);
    });
    nav_links.forEach((link) =>
      link.parentNode.classList.remove(submenuActiveClass)
    );
  }

  // Reset on body click
  pageTopWrapper.addEventListener("click", cleanUpClasses);

  // Mobile menu toggle open/close
  burger?.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();

    this.classList.toggle("is-open");
    mobileNav?.classList.toggle("is-open");
    body.classList.toggle("m-nav-is-open");

    if (mobileNav?.classList.contains("is-open")) {
      const mobileMenuLinks = mobileNav.getElementsByTagName("a");
      if (mobileMenuLinks.length) {
        setTimeout(() => mobileMenuLinks[0].focus(), 200);
      }
    } else {
      // Cleanup class's if exists
      cleanUpClasses();
    }
  });

  // Close mobile menu if main wrapper is clicked.
  pageTopWrapper?.addEventListener("click", function (e) {
    if (mobileNav?.classList.contains("is-open")) {
      e.stopPropagation();
      e.preventDefault();
      burger.dispatchEvent(new Event("click"));
    }
  });

  // All menus - Submenu Toggle
  nav_links?.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      // Remove existing classes
      cleanUpClasses();

      const wrapperNav = link.closest("nav");
      wrapperNav?.classList.add(`has-${submenuActiveClass}`);
      link.parentNode?.classList.toggle(submenuActiveClass);
    });
  });

  // Mobile Menu, toggle height on skew & overlay
  const mob_nav_links = document.querySelectorAll(
    ".menu--main li.menu-item-has-children > a, .m-nav-style--skew .menu--mobile li.menu-item-has-children > a, .m-nav-style--overlay .menu--mobile li.menu-item-has-children > a"
  );
  mob_nav_links?.forEach((link) => {
    link.addEventListener("click", (e) => {
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

  // Appends extras to menu, on slide menu
  if (body.classList.contains("m-nav-style--slide")) {
    // Close button
    const closeButton = document.createElement("button");
    closeButton.className = "close-menu";
    closeButton.innerText = "Close";

    closeButton.addEventListener("click", function (e) {
      burger.dispatchEvent(new Event("click"));
    });

    mobileNav.appendChild(closeButton);

    // Go back
    const subMenus = mobileNav.querySelectorAll(".sub-menu-wrap .sub-menu");
    subMenus.forEach((subMenu) => {
      const goBackButtonWrap = document.createElement("li");
      goBackButtonWrap.className = "gobacktoprevious";

      const goBackButton = document.createElement("a");
      goBackButton.innerText = "< Back";

      goBackButton.addEventListener("click", function (e) {
        this.parentNode.parentNode.parentNode.parentNode.classList.remove(
          submenuActiveClass
        );
      });

      goBackButtonWrap.appendChild(goBackButton);

      subMenu.insertBefore(goBackButtonWrap, subMenu.firstChild);
    });
  }
});
