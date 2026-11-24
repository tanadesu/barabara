'use client';

import { useEffect } from 'react';

export function IntroScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let used = false;
    let touchStartY = 0;
    const jumpToAbout = () => {
      if (used || window.scrollY > 80) return;
      const about = document.getElementById('about');
      if (!about) return;
      used = true;
      about.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY < 12 || (event.target instanceof Element && event.target.closest('a, button, input, textarea, select'))) return;
      jumpToAbout();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.changedTouches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      if (touchStartY - touchEndY > 55) jumpToAbout();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowDown', 'PageDown', ' '].includes(event.key) || (event.target instanceof Element && event.target.closest('a, button, input, textarea, select'))) return;
      event.preventDefault();
      jumpToAbout();
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return null;
}
