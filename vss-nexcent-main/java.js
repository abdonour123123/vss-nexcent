"use strict";

/* ===================================================
   HERO SLIDER
=================================================== */
const heroHeader = document.querySelector(".hero-header-side h1");
const heroParagraph = document.querySelector(".hero-header-side p");
const heroImage = document.querySelector(".hero-image");
const dots = document.querySelectorAll(".dot");

const slides = [
  {
    heading: `Lessons and insights <br /><span> from 8 years </span>`,
    text: "Where to grow your business as a photographer: site or social media?",
    image: "imgs/Illustration.png",
  },
  {
    heading: `Build , <span> Scale</span>`,
    text: "Mastering Backend Flow.",
    image: "imgs/illustration1.jpg",
  },
  {
    heading: `The New Era of Automated <span>Infrastructure</span>`,
    text: "Leveraging APIs and CI/CD to Orchestrate Your Complete Software Development Pipeline.",
    image: "imgs/illustartion2.jpg",
  },
];

function updateSlide(index) {
  const slide = slides[index];
  heroHeader.innerHTML = slide.heading;
  heroParagraph.textContent = slide.text;
  heroImage.src = slide.image;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Hero dots click
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.index);
    updateSlide(index);
  });
});

/* ===================================================
   SMOOTH SCROLL
=================================================== */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ===================================================
   SCROLL REVEAL ANIMATION
=================================================== */
const sections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.3 },
);

sections.forEach((section) => revealObserver.observe(section));

/* ===================================================
   COUNTER ANIMATION
=================================================== */
const statsSection = document.querySelector("#stats-section");
const counters = document.querySelectorAll(".counter");

function startCounting() {
  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    const duration = +counter.dataset.duration || 2000;
    let startTime = null;

    function animateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);
      const current = Math.floor(progressPercent * target);
      counter.innerText = current.toLocaleString();

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      }
    }

    requestAnimationFrame(animateCount);
  });
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting();
        counterObserver.unobserve(entry.target); // Run once only
      }
    });
  },
  { threshold: 0.5 },
);

if (statsSection) counterObserver.observe(statsSection);

/* ===================================================
   CUSTOMER LOGOS ANIMATION
=================================================== */
const ImageContainer = document.querySelector(".image-container");
const logos = document.querySelectorAll(".logo-customer-image");

const logoObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;

    logos.forEach((logo, index) => {
      setTimeout(() => {
        logo.classList.add("show");
      }, index * 150);
    });

    logoObserver.unobserve(ImageContainer); // Animate once only
  },
  { threshold: 0.3 },
);

if (ImageContainer) logoObserver.observe(ImageContainer);

/* ===================================================
   GENERIC MODAL FUNCTIONALITY
=================================================== */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".readmore").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    modalTitle.textContent = link.dataset.title;
    modalText.textContent = link.dataset.text;
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => (modal.style.display = "none"));

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

/* ===================================================
   LOGIN & SIGNUP MODALS
=================================================== */
const loginModal = document.querySelector(".custom-login-modal");
const signupModal = document.querySelector(".custom-signup-modal");
const loginBtn = document.querySelector(".login-button");
const signupBtn = document.querySelector(".sign-up-button");
const closeButtons = document.querySelectorAll(".custom-close");

// Open Modals
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "block";
});
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signupModal.style.display = "block";
});

// Close Modals
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
  });
});

// Close by clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.style.display = "none";
  if (e.target === signupModal) signupModal.style.display = "none";
});

/* ===================================================
   SHOW / HIDE PASSWORD FUNCTION
=================================================== */
function setupShowPassword(modal) {
  const passwordGroups = modal.querySelectorAll(".custom-password-group");

  passwordGroups.forEach((group) => {
    const input = group.querySelector('input[type="password"]');
    const icon = group.querySelector(".custom-show-password");

    if (icon && input) {
      icon.addEventListener("click", () => {
        if (input.type === "password") {
          input.type = "text";
          icon.style.color = "#4CAF4F";
        } else {
          input.type = "password";
          icon.style.color = "#888";
        }
      });
    }
  });
}

// Apply show/hide password to both modals
setupShowPassword(loginModal);
setupShowPassword(signupModal);

/* ===================================================
STICKY HEADER
=================================================== */

const header = document.querySelector(".header");
const stickyOffset = 100; // the scroll position when header becomes sticky

window.addEventListener("scroll", () => {
  if (window.scrollY > stickyOffset) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
