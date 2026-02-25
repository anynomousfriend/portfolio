'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { whenSmootherReady } from '@/lib/smoother-ready';
import { Briefcase, ExternalLink } from 'lucide-react';
import { experience } from '@/data/experience';
import { TechBadge } from '@/components/ui/tech-badge';
import { UxLawTooltip } from '@/components/ui/ux-law-tooltip';
import { AppTooltip } from '@/components/ui/app-tooltip';

// Rotating glow border on the icon box — activates when the parent row is hovered.
// containerRef should point to the parent row element (the group div).
function GlowIcon({ children, containerRef }: { children: React.ReactNode; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(Math.random() * 360);
  const rafRef = useRef<number | null>(null);
  const isHovering = useRef(false);

  const drift = useCallback(() => {
    if (isHovering.current && innerRef.current) {
      angleRef.current = (angleRef.current + 0.4) % 360;
      const a = angleRef.current * (Math.PI / 180);
      const x = Math.cos(a) * 2;
      const y = Math.sin(a) * 2;
      innerRef.current.style.boxShadow = `
        0 0 0 1px rgba(99,102,241,0.9),
        ${x}px ${y}px 8px 1px rgba(99,102,241,0.6),
        ${-x}px ${-y}px 4px 1px rgba(129,140,248,0.3)
      `;
    }
    rafRef.current = requestAnimationFrame(drift);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(drift);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [drift]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => {
      isHovering.current = false;
      if (innerRef.current) innerRef.current.style.boxShadow = 'none';
    };
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef]);

  return (
    <div className="shrink-0">
      <div ref={innerRef} className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/50 rounded-md flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}

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
  'BuidlGuidl': 'productivity', // Fallback to productivity for now if specific not available
  'PoolFunders': 'risk', // Fallback
  'Foliobull': 'risk', // Fallback
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

// Each experience row — has its own ref passed to GlowIcon
function ExperienceRow({ job, index, total }: { job: typeof experience[0]; index: number; total: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={rowRef} className="group relative flex gap-4 sm:gap-6">
      {/* Logo Column */}
      <GlowIcon containerRef={rowRef}>
        {job.logo ? (
          <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
        ) : (
          <Briefcase size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </GlowIcon>

      {/* Content Column */}
      <div className={`flex-1 pb-10 ${index !== total - 1 ? 'border-b border-border' : ''}`}>
        <div className="flex flex-col mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
              {job.role}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-base text-foreground/90 font-medium mt-1">
            <span>{job.company}</span>
            {job.liveUrl && (
              <a
                href={job.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                aria-label={`View live project for ${job.company}`}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-medium">{job.period}</span>
            {job.location && (
              <>
                <span className="hidden sm:inline text-border">•</span>
                <span>{job.location}</span>
              </>
            )}
          </div>
        </div>

        <div className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-2xl group-hover:text-foreground/90 transition-colors">
          {renderDescription(job.description)}
        </div>

        <div className="flex flex-wrap gap-2">
          {job.technologies.map((tech, i) => (
            <TechBadge key={i} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const items = itemsRef.current;
    if (!header || !items) return;

    const ctx = gsap.context(() => {});
    let scrollCtx: ReturnType<typeof gsap.context> | null = null;

    const setupAnimations = () => {
      if (!headerRef.current) return;
      scrollCtx = gsap.context(() => {
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
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
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
      }, sectionRef);
    };

    let cancelled = false;
    whenSmootherReady(() => { if (!cancelled) setupAnimations(); });

    return () => {
      cancelled = true;
      scrollCtx?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-6 max-w-4xl mx-auto bg-background relative z-10">
      <div ref={headerRef} className="mb-16 text-center sm:text-left">
        <h2 className="text-3xl font-extrabold text-foreground mb-4 tracking-tight">Work Experience</h2>
        <div className="w-16 h-1 bg-primary mb-6 mx-auto sm:mx-0" />
        <p className="text-muted-foreground max-w-lg leading-relaxed text-sm mx-auto sm:mx-0">
          A look at my professional journey, <span className="text-foreground font-medium">building products</span> and <span className="text-foreground font-medium">solving complex problems</span> at the intersection of design and technology.
        </p>
      </div>

      <div className="space-y-10" ref={itemsRef}>
        {experience.map((job, index) => (
          <ExperienceRow key={index} job={job} index={index} total={experience.length} />
        ))}
      </div>
    </section>
  );
}
