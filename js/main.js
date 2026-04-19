document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-link");

  const closeMobileMenu = () => {
    if (!hamburger || !navLinks) return;
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isActive = hamburger.classList.toggle("active");
      navLinks.classList.toggle("active", isActive);
      document.body.classList.toggle("menu-open", isActive);
    });

    links.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (!navLinks.classList.contains("active")) return;
      const clickedInsideNav = navLinks.contains(event.target);
      const clickedHamburger = hamburger.contains(event.target);
      if (!clickedInsideNav && !clickedHamburger) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();

  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach((element) => {
      const revealTop = element.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
  });
});
