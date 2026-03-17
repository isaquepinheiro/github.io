(() => {
  const root = document.documentElement;
  const setCompact = () => {
    const isMobile = window.matchMedia('(max-width: 996px)').matches;
    const threshold = isMobile ? 8 : 18;
    if (window.scrollY > threshold) {
      root.classList.add('docs-navbar-compact');
      return;
    }
    root.classList.remove('docs-navbar-compact');
  };
  window.addEventListener('scroll', setCompact, {passive: true});
  window.addEventListener('resize', setCompact);
  setCompact();
})();

