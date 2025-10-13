// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Typewriter effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Add staggered animations to work items
  const workItems = document.querySelectorAll(".work-item");
  workItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });

  // Add staggered animations to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Add staggered animations to skill items
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
  });

  // Skill icons now use CSS hover effects only

  // Add click effects to project cards
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Add floating animation to logo
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.classList.add("float");
  }

  // Add pulse animation to accent elements
  const accentElements = document.querySelectorAll(".work-company, .accent");
  accentElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.classList.add("pulse");
    });

    element.addEventListener("mouseleave", () => {
      element.classList.remove("pulse");
    });
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    "section, .work-item, .project-card, .skill-item"
  );
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
});
