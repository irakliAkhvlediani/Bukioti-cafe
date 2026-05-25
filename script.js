(function () {
  const header = document.getElementById("header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const yearEl = document.getElementById("year");
  const menuTabs = document.querySelectorAll(".menu-tab");
  const menuPanels = document.querySelectorAll(".menu-panel");
  const reviewsTrack = document.getElementById("reviewsTrack");
  const revPrev = document.querySelector(".rev-prev");
  const revNext = document.querySelector(".rev-next");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Scroll header */
  function onScroll() {
    if (window.scrollY > 60) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open);
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Menu tabs */
  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const panelId = tab.dataset.panel;
      menuTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      menuPanels.forEach((panel) => {
        const active = panel.id === panelId;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
    });
  });

  /* Reviews carousel */
  function scrollReviews(dir) {
    if (!reviewsTrack) return;
    const card = reviewsTrack.querySelector(".review-card");
    const gap = 24;
    const amount = (card ? card.offsetWidth : 380) + gap;
    reviewsTrack.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  if (revPrev) revPrev.addEventListener("click", () => scrollReviews(-1));
  if (revNext) revNext.addEventListener("click", () => scrollReviews(1));

  /* Auto-advance reviews */
  let reviewInterval = setInterval(() => scrollReviews(1), 6000);
  if (reviewsTrack) {
    reviewsTrack.addEventListener("pointerdown", () => clearInterval(reviewInterval));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(
    ".story-grid, .sig-grid-text .sig-card, .menu-panels, .gallery-grid-6 .g-item, .review-card, .exp-item, .visit-grid"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  /* Smooth anchor offset for fixed header */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
