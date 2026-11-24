'use client';

import { useEffect } from 'react';

export function IntroScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let used = false;
    let touchStartY = 0;
    let touchStartScrollY = 0;
    let frame = 0;
    const jumpToAbout = (fromTouch = false) => {
      if (used || (!fromTouch && window.scrollY > 80)) return;
      const about = document.getElementById('about');
      if (!about) return;
      used = true;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      document.body.classList.add('intro-scrolling');
      const startY = window.scrollY;
      const targetY = Math.max(0, startY + about.getBoundingClientRect().top - 40);
      const startTime = performance.now();
      const duration = 950;
      const animateScroll = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        window.scrollTo(0, startY + (targetY - startY) * eased);
        if (progress < 1) {
          frame = requestAnimationFrame(animateScroll);
        } else {
          root.style.scrollBehavior = previousScrollBehavior;
          window.setTimeout(() => document.body.classList.remove('intro-scrolling'), 80);
          removeListeners();
        }
      };
      frame = requestAnimationFrame(animateScroll);
    };
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY < 12 || (event.target instanceof Element && event.target.closest('a, button, input, textarea, select'))) return;
      if (window.scrollY <= 80) {
        event.preventDefault();
        jumpToAbout();
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.changedTouches[0]?.clientY ?? 0;
      touchStartScrollY = window.scrollY;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      if (touchStartScrollY <= 80 && touchStartY - touchEndY > 55) jumpToAbout(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowDown', 'PageDown', ' '].includes(event.key) || (event.target instanceof Element && event.target.closest('a, button, input, textarea, select'))) return;
      event.preventDefault();
      jumpToAbout();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('.scroll-link')) {
        event.preventDefault();
        jumpToAbout(true);
      }
    };
    function removeListeners() {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClick);
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove('intro-scrolling');
      removeListeners();
    };
  }, []);

  return null;
}
