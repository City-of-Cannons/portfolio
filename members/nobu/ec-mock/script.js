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

// Recommended products slider: loops through 4 pages.
const slider = document.querySelector('[data-slider="recommended"]');

if (slider) {
  const track = slider.querySelector('.slider-track');
  const pages = Array.from(slider.querySelectorAll('.slide-page'));
  const dots = Array.from(slider.querySelectorAll('.dot'));
  const prevBtn = slider.querySelector('[data-action="prev"]');
  const nextBtn = slider.querySelector('[data-action="next"]');

  let currentIndex = 0;
  let timerId = null;

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
    });
  };

  const goTo = (index) => {
    const total = pages.length;
    currentIndex = (index + total) % total;
    updateSlider();
  };

  const startAutoPlay = () => {
    if (timerId) {
      return;
    }
    timerId = setInterval(() => {
      goTo(currentIndex + 1);
    }, 3400);
  };

  const stopAutoPlay = () => {
    if (!timerId) {
      return;
    }
    clearInterval(timerId);
    timerId = null;
  };

  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goTo(index));
  });

  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  updateSlider();
  startAutoPlay();
}
