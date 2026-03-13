'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { onSmootherReady } from '@/lib/smoother-ready';
import { ExternalLink, Award } from 'lucide-react';
import { certificates } from '@/data/certificates';

// ScrollTrigger is registered globally in SmoothScrollProvider

export function CertificatesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollCtx: ReturnType<typeof gsap.context> | null = null;
    let cancelled = false;

    const setupAnimations = async () => {
      await onSmootherReady();
      if (cancelled) return;

      const header = headerRef.current;
      const list = listRef.current;
      if (!header || !list) return;

      scrollCtx = gsap.context(() => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              // Removed scroller: '#smooth-wrapper'
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          Array.from(list.children) as HTMLElement[],
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.8, ease: 'power3.out',
            stagger: { each: 0.15, from: 'start' },
            scrollTrigger: {
              trigger: list,
              // Removed scroller: '#smooth-wrapper'
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, sectionRef);
    };

    setupAnimations();

    return () => {
      cancelled = true;
      scrollCtx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="certificates" className="py-24 px-6 max-w-4xl mx-auto bg-background relative z-10">
      <div ref={headerRef} className="mb-12 text-center sm:text-left">
        <h2 className="text-3xl font-extrabold text-foreground mb-4 tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <Award className="text-primary w-8 h-8" />
          Certifications
        </h2>
        <div className="w-16 h-1 bg-primary mb-6 mx-auto sm:mx-0" />
        <p className="text-muted-foreground max-w-lg leading-relaxed text-sm mx-auto sm:mx-0">
          Continuous learning and academic achievements to stay at the forefront of technology and design.
        </p>
      </div>

      <div className="flex flex-col gap-3" ref={listRef}>
        {certificates.map((cert, index) => (
          <a 
            key={index} 
            href={cert.url || '#'}
            target={cert.url ? "_blank" : undefined}
            rel={cert.url ? "noopener noreferrer" : undefined}
            className={`group relative flex items-center justify-between p-5 border border-border/50 rounded-lg hover:border-primary/50 bg-background hover:bg-secondary/20 transition-all duration-300 z-10 hover:z-20 ${cert.url ? 'cursor-pointer' : ''}`}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(
                new CustomEvent('robot:certificate-enter', {
                  detail: {
                    x: rect.right - 300,
                    y: rect.bottom + 20,
                  },
                })
              );
            }}
            onMouseLeave={() => {
              window.dispatchEvent(new CustomEvent('robot:certificate-leave'));
            }}
          >
            
            {/* Hover Image Pop-out */}
            <div className="absolute right-16 sm:right-24 top-1/2 -translate-y-1/2 w-48 sm:w-64 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 z-50 shadow-2xl rounded-md border border-white/10 rotate-3 group-hover:-rotate-2 origin-center">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-auto rounded-md object-cover shadow-2xl"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col z-10 pr-4">
              <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1.5">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium text-foreground/80">{cert.issuer}</span>
                <span className="text-border hidden sm:inline">•</span>
                <span className="font-mono text-xs">{cert.date}</span>
              </p>
            </div>

            {/* Action */}
            <div className="shrink-0 z-10">
              {cert.url && (
                <div
                  className="inline-flex items-center justify-center p-2 rounded-full bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors"
                  aria-hidden="true"
                >
                  <ExternalLink size={16} />
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
