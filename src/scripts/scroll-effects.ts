/**
 * Header scroll effect - adds blur background when scrolled
 */
export function initHeaderScroll(): void {
  const header = document.getElementById('site-header');

  if (!header) return;

  function handleScroll(): void {
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Initialize all scroll effects
 */
export function initScrollEffects(): void {
  initHeaderScroll();
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollEffects);
  } else {
    initScrollEffects();
  }
}
