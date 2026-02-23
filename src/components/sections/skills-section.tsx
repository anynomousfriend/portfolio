'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/data/skills';
import { SkillCard } from '@/components/ui/skill-card';

gsap.registerPlugin(ScrollTrigger);

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const header = headerRef.current!;
    const cards = Array.from(cardsRef.current!.children) as HTMLElement[];

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 0, y: 30, filter: 'blur(8px)' });
      gsap.set(cards, { opacity: 0, y: 60, filter: 'blur(6px)', scale: 0.96 });

      // Build the animation timeline (time-based, not scrub-based)
      const tl = gsap.timeline({ paused: true });

      // Header fades in first
      tl.to(header, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
      });

      // Cards stagger in one by one
      tl.to(cards, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        stagger: { each: 0.12, from: 'start' },
      }, '-=0.2');

      // Brief hold after all cards are in before releasing pin
      tl.to({}, { duration: 0.8 });

      // Calculate total animation duration to use as the pin scroll distance
      // We multiply by a px-per-second factor so ScrollSmoother feels natural
      const animDuration = tl.totalDuration(); // seconds
      const scrollDistance = animDuration * 180; // ~180px per second feels natural

      ScrollTrigger.create({
        trigger: section,
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

    }, section);

    return () => ctx.revert();
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
