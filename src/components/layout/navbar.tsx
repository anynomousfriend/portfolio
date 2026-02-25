'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/ui/contact-modal';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// ScrollTrigger + ScrollSmoother are registered globally in SmoothScrollProvider.
// Do NOT call registerPlugin here.

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let st: ReturnType<typeof ScrollTrigger.create> | null = null;

    const setupScrollTrigger = () => {
      if (!navRef.current) return;
      // Use ScrollTrigger to toggle the scrolled state — this works correctly
      // with ScrollSmoother since GSAP proxies all scroll through ScrollTrigger.
      st = ScrollTrigger.create({
        trigger: '#hero-name',
        start: 'bottom 60%',
        onEnter: () => nav.setAttribute('data-scrolled', 'true'),
        onLeaveBack: () => nav.setAttribute('data-scrolled', 'false'),
      });
    };

    // Defer until ScrollSmoother is ready — ScrollTrigger.create() must not be
    // called before SmoothScrollProvider's useEffect runs ScrollSmoother.create().
    // Additionally, wrap every call in setTimeout(fn, 0) so it always runs in a
    // fresh macrotask, after ScrollSmoother's scroller proxy is fully usable.
    const deferredSetup = () => setTimeout(setupScrollTrigger, 0);

    if (ScrollSmoother.get()) {
      setTimeout(setupScrollTrigger, 0);
    } else {
      window.addEventListener('smoothscroller:ready', deferredSetup, { once: true });
    }

    return () => {
      window.removeEventListener('smoothscroller:ready', deferredSetup);
      st?.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true, 'top 80px');
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // suppress unused warning — handleNavClick is wired to nav links when added
  void handleNavClick;

  return (
    <>
    <nav
      ref={navRef}
      data-scrolled="false"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        'data-[scrolled=false]:bg-transparent data-[scrolled=false]:py-5',
        'data-[scrolled=true]:bg-background/80 data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:border-b data-[scrolled=true]:border-border/50 data-[scrolled=true]:py-3'
      )}
    >
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="font-bold text-lg tracking-tight text-zinc-300 whitespace-nowrap">
            Subhankar<span className="text-indigo-500">.</span>
          </span>
        </a>

        <Button ref={contactBtnRef} variant="outline" size="sm" onClick={() => setContactOpen(true)}>
          Contact
        </Button>
      </div>
    </nav>

    <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} anchorRef={contactBtnRef} />
    </>
  );
}
