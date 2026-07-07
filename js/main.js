(function () {
  const root = document.documentElement;
  const navToggle = document.querySelector(".js-nav-toggle");
  const navMenu = document.querySelector("#primary-menu");
  const themeToggle = document.querySelector(".js-theme-toggle");
  const yearNodes = document.querySelectorAll(".js-current-year");
  const storageKey = "allantacuel-theme";

  const savedTheme = window.localStorage.getItem(storageKey);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.setAttribute("data-theme", savedTheme || preferredTheme);

  yearNodes.forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) {
        navMenu.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      window.localStorage.setItem(storageKey, nextTheme);
    });
  }
})();
