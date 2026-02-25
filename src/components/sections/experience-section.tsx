'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, ExternalLink } from 'lucide-react';
import { experience } from '@/data/experience';
import { TechBadge } from '@/components/ui/tech-badge';
import { Badge } from '@/components/ui/badge';
import { UxLawTooltip } from '@/components/ui/ux-law-tooltip';
import { AppTooltip } from '@/components/ui/app-tooltip';

// ScrollTrigger is registered globally in SmoothScrollProvider

// Maps italic *UX Law* names to their tooltip law key
const uxLawMap: Record<string, 'millers' | 'fitts' | 'peak-end' | 'zeigarnik'> = {
  'Miller\u2019s Law': 'millers',
  'Fitts\u2019s Law': 'fitts',
  'Peak-End Rule': 'peak-end',
  'Zeigarnik Effect': 'zeigarnik',
};

// Maps bold **App Name** to their tooltip app key
const appMap: Record<string, 'risk' | 'legal' | 'medical' | 'productivity'> = {
  'Risk Management SaaS': 'risk',
  'Lawyer\u2019s SaaS': 'legal',
  'Medical Apps': 'medical',
  'Productivity Apps': 'productivity',
};

// Renders **bold** as bright indigo highlights and *italic* as UxLawTooltip or zinc-200
function renderDescription(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      const appKey = appMap[inner];
      if (appKey) {
        return <AppTooltip key={i} app={appKey}>{inner}</AppTooltip>;
      }
      return (
        <span key={i} className="text-indigo-300 font-semibold">
          {inner}
        </span>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      const lawKey = uxLawMap[inner];
      if (lawKey) {
        return (
          <UxLawTooltip key={i} law={lawKey}>
            {inner}
          </UxLawTooltip>
        );
      }
      return (
        <span key={i} className="text-zinc-200 font-medium">
          {inner}
        </span>
      );
    }
    return part;
  });
}

export function ExperienceSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const items = itemsRef.current;
    if (!header || !items) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            scroller: '#smooth-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        Array.from(items.children) as HTMLElement[],
        { opacity: 0, x: -30, filter: 'blur(6px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)',
          duration: 0.8, ease: 'power3.out',
          stagger: { each: 0.15, from: 'start' },
          scrollTrigger: {
            trigger: items,
            scroller: '#smooth-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto bg-background relative z-10">
      <div ref={headerRef} className="mb-12">
        <h2 className="text-3xl font-extrabold text-foreground mb-4 tracking-tight">Work History</h2>
        <div className="w-16 h-1 bg-primary mb-6" />
        <p className="text-muted-foreground max-w-lg leading-relaxed text-sm">
          A timeline of my professional journey, <span className="text-foreground font-medium">building products</span> and <span className="text-foreground font-medium">leading teams</span> across various industries.
        </p>
      </div>

      {/* Timeline: line + items share the same coordinate space */}
      <div className="relative">
        {/* Vertical Base Line — sits at x=20px */}
        <div className="absolute left-5 top-2 bottom-0 w-px bg-border" />

        <div className="space-y-12" ref={itemsRef}>
          {experience.map((job, index) => (
            <div key={index} className="group relative flex gap-8 transition-all duration-500">

              {/* Left column: diamond + highlight line, fixed width 40px */}
              <div className="relative shrink-0 w-10">
                {/* Diamond centered at x=20px (left: 50% - 5.5px ≈ left-[14.5px]) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[11px] h-[11px] bg-background border-2 border-muted-foreground rotate-45 group-hover:bg-primary/20 group-hover:border-primary transition-all duration-300 z-10 shadow-[0_0_0_4px_var(--background)]" />

                {/* Connecting Highlight Line — centered under diamond */}
                {index !== experience.length - 1 && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-[22px] bottom-[-48px] w-px bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-in-out"
                    style={{ boxShadow: '0 0 6px 2px rgba(99,102,241,0.7), 0 0 16px 4px rgba(99,102,241,0.35)' }}
                  />
                )}
              </div>

              {/* Right column: content */}
              <div className="flex-1 pb-2">

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1.5 gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {job.company}
                  </h3>
                  {job.liveUrl && (
                    <a
                      href={job.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                      aria-label={`View live project for ${job.company}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <Badge variant="secondary" className="font-mono text-[10px] mt-1 sm:mt-0 w-fit shrink-0">
                  {job.period}
                </Badge>
              </div>

              <div className="text-base text-foreground font-medium mb-3 flex items-center gap-2">
                <Briefcase size={14} className="text-primary" />
                {job.role}
              </div>

              <div className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-xl group-hover:text-foreground transition-colors">
                {renderDescription(job.description)}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {job.technologies.map((tech, i) => (
                  <TechBadge key={i} tech={tech} />
                ))}
              </div>
              </div>{/* end right column */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
