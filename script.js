// Loader: show until full page load, with a minimum display time and fade-out
(function () {
	const loader = document.getElementById("site-loader");
	if (!loader) return;
	const minDisplay = 500; // ms
	const started = performance.now();

	function hideLoader() {
		const elapsed = performance.now() - started;
		const wait = Math.max(0, minDisplay - elapsed);
		setTimeout(() => {
			loader.classList.add("loader-hidden");
			// remove from DOM after transition
			loader.addEventListener(
				"transitionend",
				function () {
					try {
						loader.remove();
					} catch (e) {
						/* ignore */
					}
				},
				{ once: true }
			);
		}, wait);
	}

	if (document.readyState === "complete") {
		hideLoader();
	} else {
		window.addEventListener("load", hideLoader);
		// fallback: hide after 5s to avoid stuck loader
		setTimeout(hideLoader, 5000);
	}
})();

// Smooth scroll (robust)
// Delegated handler that safely handles: href="#" (scroll to top),
// same-document hashes, and links that include the filename (e.g. index.html#work).
(function () {
	function handleAnchorClick(e) {
		const anchor = this;

		// Ignore if user intended to open in new tab or used modifier keys
		if (anchor.target && anchor.target !== "") return;
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

		const href = anchor.getAttribute("href");
		if (!href || !href.includes("#")) return;

		// Build absolute URL from href so we can compare pathname/origin
		let url;
		try {
			url = new URL(href, location.href);
		} catch (err) {
			return; // invalid URL
		}

		// Only handle links that point to the current document
		if (url.origin !== location.origin) return;
		if (url.pathname !== location.pathname) return;

		const hash = url.hash || "#";
		let target = null;
		if (hash === "#" || hash === "") {
			target = document.documentElement; // scroll to top
		} else {
			const id = hash.slice(1);
			try {
				// prefer getElementById to avoid CSS selector issues
				target =
					document.getElementById(id) ||
					document.querySelector(`[name="${id}"]`);
			} catch (err) {
				target = null;
			}
		}

		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: "smooth", block: "start" });
			// update URL hash without causing an extra jump
			try {
				history.replaceState(null, "", hash);
			} catch (err) {
				// ignore
			}
		}
	}

	// Use event delegation so this works for anchors added later as well
	document.addEventListener("click", function (e) {
		const el = e.target.closest && e.target.closest('a[href*="#"]');
		if (el) handleAnchorClick.call(el, e);
	});
})();

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
