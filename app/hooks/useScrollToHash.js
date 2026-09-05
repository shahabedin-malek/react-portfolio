import { useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from '@remix-run/react';
import { useCallback, useRef } from 'react';

export function useScrollToHash() {
  const scrollTimeout = useRef();
  const frameRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const scrollToHash = useCallback(
    (hash, onDone) => {
      const id = typeof hash === 'string' ? hash.split('#')[1] : '';

      if (!id) {
        onDone?.();
        return;
      }

      let attempts = 0;
      const maxAttempts = 60;

      const cleanup = () => {
        if (frameRef.current !== undefined && frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }

        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout.current);
      };

      const finish = () => {
        cleanup();
        onDone?.();
      };

      const handleScroll = () => {
        clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          window.removeEventListener('scroll', handleScroll);

          if (window.location.pathname === location.pathname) {
            onDone?.();
            navigate(`${location.pathname}#${id}`, { scroll: false });
          }
        }, 50);
      };

      const findAndScroll = () => {
        attempts += 1;

        const targetElement = document.getElementById(id);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
          });

          window.addEventListener('scroll', handleScroll);

          // If the browser does not emit a scroll event because the target is
          // already visible, finish after a short bounded delay.
          scrollTimeout.current = setTimeout(() => {
            if (window.location.pathname === location.pathname) {
              onDone?.();
              navigate(`${location.pathname}#${id}`, { scroll: false });
            }
          }, 100);

          return;
        }

        if (attempts >= maxAttempts) {
          finish();
          return;
        }

        frameRef.current = requestAnimationFrame(findAndScroll);
      };

      frameRef.current = requestAnimationFrame(findAndScroll);

      return cleanup;
    },
    [navigate, reduceMotion, location.pathname]
  );

  return scrollToHash;
}