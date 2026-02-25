'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { skills } from '@/data/skills';
import { SkillCard } from '@/components/ui/skill-card';

// ScrollTrigger is registered globally in SmoothScrollProvider

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !header || !cardsContainer) return;

    const cards = Array.from(cardsContainer.children) as HTMLElement[];

    const ctx = gsap.context(() => {});

    const setupAnimations = () => {
      if (!sectionRef.current) return;
      ctx.add(() => {
        gsap.set(header, { opacity: 0, y: 30, filter: 'blur(8px)' });
        gsap.set(cards, { opacity: 0, y: 60, filter: 'blur(6px)', scale: 0.96 });

        const tl = gsap.timeline({ paused: true });

        tl.to(header, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.7, ease: 'power3.out',
        });

        tl.to(cards, {
          opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
          duration: 0.55, ease: 'power3.out',
          stagger: { each: 0.12, from: 'start' },
        }, '-=0.2');

        tl.to({}, { duration: 0.8 });

        const scrollDistance = tl.totalDuration() * 180;

        ScrollTrigger.create({
          trigger: section,
          scroller: '#smooth-wrapper',
          pinnedContainer: '#smooth-content',
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          anticipatePin: 1,
          onEnter: () => tl.play(),
          onLeaveBack: () => {
            tl.pause(0);
            gsap.set(header, { opacity: 0, y: 30, filter: 'blur(8px)' });
            gsap.set(cards, { opacity: 0, y: 60, filter: 'blur(6px)', scale: 0.96 });
          },
        });
      });
    };

    if (ScrollSmoother.get()) {
      setupAnimations();
    } else {
      window.addEventListener('smoothscroller:ready', setupAnimations, { once: true });
    }

    return () => {
      window.removeEventListener('smoothscroller:ready', setupAnimations);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <div ref={headerRef} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            What I Do<span className="text-primary">.</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-6" />
          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
            A blend of <span className="text-foreground font-medium">design thinking</span> and{' '}
            <span className="text-foreground font-medium">technical execution</span>, from concept to shipped product.
          </p>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.title} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
