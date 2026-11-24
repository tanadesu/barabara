'use client';

import { useEffect } from 'react';

export function IntroScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let used = false;
    let holding = false;
    let touchStartY = 0;
    let touchStartScrollY = 0;
    let frame = 0;
    let holdTimer = 0;
    let unlockPage: (() => void) | null = null;

    const lockPage = () => {
      const body = document.body;
      const root = document.documentElement;
      const scrollbarGap = window.innerWidth - root.clientWidth;
      const previous = {
        rootOverflow: root.style.overflow,
        rootOverscroll: root.style.overscrollBehavior,
        overflow: body.style.overflow,
        overscroll: body.style.overscrollBehavior,
        paddingRight: body.style.paddingRight,
      };

      root.style.overflow = 'hidden';
      root.style.overscrollBehavior = 'none';
      body.style.overflow = 'hidden';
      body.style.overscrollBehavior = 'none';
      if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

      return () => {
        root.style.overflow = previous.rootOverflow;
        root.style.overscrollBehavior = previous.rootOverscroll;
        body.style.overflow = previous.overflow;
        body.style.overscrollBehavior = previous.overscroll;
        body.style.paddingRight = previous.paddingRight;
      };
    };

    const removeListeners = () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClick);
    };

    const animateToAbout = (about: HTMLElement) => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      document.body.classList.add('intro-scrolling');
      const startY = window.scrollY;
      const targetY = Math.max(0, startY + about.getBoundingClientRect().top - 40);
      const startTime = performance.now();
      const duration = 550;
      const animateScroll = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
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

    const jumpToAbout = (fromTouch = false) => {
      if (used || (!fromTouch && window.scrollY > 80)) return;
      const about = document.getElementById('about');
      if (!about) return;
      used = true;
      holding = true;
      unlockPage = lockPage();
      document.body.classList.add('intro-paused');
      holdTimer = window.setTimeout(() => {
        holding = false;
        document.body.classList.remove('intro-paused');
        unlockPage?.();
        unlockPage = null;
        animateToAbout(about);
      }, 2000);
    };

    const onWheel = (event: WheelEvent) => {
      if (holding) {
        event.preventDefault();
        return;
      }
      if (used || event.deltaY < 12) return;
      if (window.scrollY <= 80) {
        event.preventDefault();
        jumpToAbout();
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.changedTouches[0]?.clientY ?? 0;
      touchStartScrollY = window.scrollY;
    };
    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.changedTouches[0]?.clientY ?? touchStartY;
      if (holding || (touchStartScrollY <= 80 && touchStartY - currentY > 8)) event.preventDefault();
    };
    const onTouchEnd = (event: TouchEvent) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      if (touchStartScrollY <= 80 && touchStartY - touchEndY > 55) jumpToAbout(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowDown', 'PageDown', ' '].includes(event.key) || (event.target instanceof Element && event.target.closest('a, button, input, textarea, select'))) return;
      event.preventDefault();
      if (!holding) jumpToAbout();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('.scroll-link')) {
        event.preventDefault();
        jumpToAbout(true);
      } else if (holding && event.target instanceof Element && event.target.closest('a, button')) {
        window.clearTimeout(holdTimer);
        holding = false;
        used = true;
        document.body.classList.remove('intro-paused');
        unlockPage?.();
        unlockPage = null;
        removeListeners();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(holdTimer);
      unlockPage?.();
      unlockPage = null;
      document.body.classList.remove('intro-paused');
      document.body.classList.remove('intro-scrolling');
      removeListeners();
    };
  }, []);

  return null;
}
