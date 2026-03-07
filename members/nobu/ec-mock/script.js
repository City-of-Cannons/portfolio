// Reveal sections when they enter the viewport.
const revealTargets = document.querySelectorAll('.js-reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -6% 0px',
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

// Add hover tilt interaction for elements that should feel interactive.
const tiltTargets = document.querySelectorAll(
  '.product-card, .cats-row li a, .bannerGrid a, .side-box, .hero, .cart-summary'
);

tiltTargets.forEach((el) => {
  el.classList.add('hover-tilt');

  el.addEventListener('mousemove', (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 6;

    el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});
