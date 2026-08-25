/* ==========================================================
   AZURE COVE HOTEL — hero slider + mobile nav
   ========================================================== */

var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

var swiper = new Swiper(".mySwiper", {
  loop: true,

  /* Crossfade rather than a horizontal push. With full-bleed photography a
     slide-across pulls the eye to the frame edges; a dissolve keeps it on the
     image. crossFade avoids the dark flash you get mid-transition when both
     slides are semi-transparent. */
  effect: "fade",
  fadeEffect: { crossFade: true },

  /* Swiper's default 300ms snaps on a hero this size. Under reduced motion the
     slide still changes — it just changes instantly instead of dissolving. */
  speed: reduceMotion ? 0 : 1200,

  /* Autoplay always runs. Reduced motion means gentler movement, not a frozen
     hero, and pauseOnMouseEnter is deliberately off: the hero fills most of the
     viewport, so a resting cursor would stop it indefinitely. */
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  keyboard: { enabled: true },
  a11y: {
    enabled: true,
    prevSlideMessage: "Previous slide",
    nextSlideMessage: "Next slide",
  },
});

/* Belt and braces: if autoplay ever comes back stopped (some browsers pause
   timers on a backgrounded tab and do not resume), restart it. */
if (swiper.autoplay && !swiper.autoplay.running) {
  swiper.autoplay.start();
}

document.addEventListener("visibilitychange", function () {
  if (!document.hidden && swiper.autoplay && !swiper.autoplay.running) {
    swiper.autoplay.start();
  }
});

/* ---------------- Mobile nav ---------------- */
var toggler = document.querySelector(".navbar-toggler");
var navLinks = document.querySelector(".nav-links");

if (toggler && navLinks) {
  toggler.setAttribute("aria-expanded", "false");

  toggler.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    toggler.setAttribute("aria-expanded", String(open));
  });

  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      navLinks.classList.remove("open");
      toggler.setAttribute("aria-expanded", "false");
    }
  });
}
