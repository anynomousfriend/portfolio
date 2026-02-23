import { useState, useEffect } from 'react';

export function useScrollPosition(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // ScrollSmoother proxies scroll through the #smooth-wrapper element,
    // so window.scrollY stays 0. We read the wrapper's scrollTop instead,
    // falling back to window.scrollY for non-GSAP environments.
    const getScrollY = () => {
      const wrapper = document.getElementById('smooth-wrapper');
      return wrapper ? wrapper.scrollTop : window.scrollY;
    };

    const handleScroll = () => {
      setScrolled(getScrollY() > threshold);
    };

    const wrapper = document.getElementById('smooth-wrapper');
    const target = wrapper ?? window;

    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
