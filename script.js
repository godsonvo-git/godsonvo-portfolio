const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backTop = document.getElementById("backTop");

menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".progress span").forEach(bar => {
        bar.style.width = bar.dataset.width + "%";
      });
    }
  });
}, { threshold: 0.25 });

const proficiency = document.getElementById("proficiency");
if (proficiency) observer.observe(proficiency);

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================================
   INTERACTIVE CUSTOM CURSOR
========================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


/* Mouse position */
document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Dot follows instantly */
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";

});


/* Smooth ring movement */
function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================================
   HOVER INTERACTION
========================================= */

const cursorTargets = document.querySelectorAll(
    "a, button, .tech, .orb, .card"
);

cursorTargets.forEach((element) => {

    element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hover");
    });

});


/* =========================================
   CLICK INTERACTION
========================================= */

document.addEventListener("mousedown", () => {
    cursorRing.classList.add("click");
});

document.addEventListener("mouseup", () => {
    cursorRing.classList.remove("click");
});

document.addEventListener("mousemove", (e) => {

    const element = document.elementFromPoint(
        e.clientX,
        e.clientY
    );

    if (!element) return;

    const whiteSection =
        element.closest(".section:not(.blue-section)");

    const whiteElement =
        element.closest(".resume-btn, .white, .card, .tech");

    const blueSection =
        element.closest(".hero, .blue-section");

    if ((whiteSection || whiteElement) && !blueSection) {

        cursorDot.classList.add("blue-cursor");
        cursorRing.classList.add("blue-cursor");

    } else {

        cursorDot.classList.remove("blue-cursor");
        cursorRing.classList.remove("blue-cursor");

    }

});
