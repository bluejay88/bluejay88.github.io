(() => {
  const hero = document.querySelector('.hero');
  const monument = document.querySelector('[data-monument]');
  if (!hero || !monument || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let frame = 0, x = 0, y = 0;
  const paint = () => { monument.style.setProperty('--monument-x', `${x * 10}px`); monument.style.setProperty('--monument-y', `${y * 7}px`); frame = 0; };
  hero.addEventListener('pointermove', event => {
    const bounds = hero.getBoundingClientRect();
    x = (event.clientX - bounds.left) / bounds.width - .5;
    y = (event.clientY - bounds.top) / bounds.height - .5;
    if (!frame) frame = requestAnimationFrame(paint);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { x = 0; y = 0; if (!frame) frame = requestAnimationFrame(paint); }, { passive: true });
})();
