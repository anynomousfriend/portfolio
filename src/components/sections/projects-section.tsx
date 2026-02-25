'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ScrollTrigger is registered globally in SmoothScrollProvider

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('dev');
  const [showAll, setShowAll] = useState(false);

  const allProjects = projects[activeTab];
  const hasFeatured = allProjects.some((p) => p.featured);
  const featuredProjects = hasFeatured ? allProjects.filter((p) => p.featured) : allProjects;
  const restProjects = hasFeatured ? allProjects.filter((p) => !p.featured) : [];
  const hasMore = restProjects.length > 0;

  const headerRef = useRef<HTMLDivElement>(null);
  const featuredGridRef = useRef<HTMLDivElement>(null);
  const moreGridRef = useRef<HTMLDivElement>(null);

  // Entrance animation — merges tab reset so both happen in a single effect,
  // eliminating the race between three separate effects on activeTab
  useEffect(() => {
    // Reset showAll synchronously before any GSAP work
    setShowAll(false);

    const header = headerRef.current;
    const grid = featuredGridRef.current;
    if (!header || !grid) return;

    const cards = Array.from(grid.children) as HTMLElement[];

    // Set initial hidden state immediately — no scroller dependency
    gsap.set(header, { opacity: 0, y: 40, filter: 'blur(8px)' });
    gsap.set(cards, { opacity: 0, y: 50, filter: 'blur(6px)', scale: 0.97 });

    const ctx = gsap.context(() => {});

    const setupAnimations = () => {
      if (!headerRef.current) return;
      ctx.add(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            scroller: '#smooth-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
        tl.to(header, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.8, ease: 'power3.out',
        }).to(cards, {
          opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
          duration: 0.6, ease: 'power3.out',
          stagger: { each: 0.1, from: 'start' },
        }, '-=0.4');
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
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
  }, [activeTab]);

  // Animate "more" cards in when expanded.
  // useLayoutEffect guarantees moreGridRef.current is populated (DOM committed)
  // before the animation reads it — fixes the null-ref race with useEffect.
  useLayoutEffect(() => {
    if (!showAll) return;
    const grid = moreGridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.children) as HTMLElement[];
    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 40, filter: 'blur(6px)', scale: 0.97 },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
        duration: 0.5, ease: 'power3.out',
        stagger: { each: 0.08, from: 'start' },
      }
    );
    return () => { tween.kill(); };
  }, [showAll]);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-indigo-400/70 mb-3">
              — Highlight Reel
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Selected Work<span className="text-primary">.</span>
            </h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-muted-foreground max-w-lg text-lg">
              A curated collection of projects spanning <span className="text-foreground font-medium">design</span> and <span className="text-foreground font-medium">development</span>.
            </p>
          </div>
          <div className="flex gap-1 bg-card/80 backdrop-blur-sm rounded-lg p-1 border self-start sm:self-auto shadow-inner">
            {(['design', 'dev'] as ProjectCategory[]).map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'capitalize transition-all duration-300',
                  activeTab === tab && 'shadow-md'
                )}
              >
                {tab === 'dev' ? 'Development' : 'Design'}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured cards — always visible */}
        <div ref={featuredGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {featuredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No projects found in this category.</p>
          </div>
        )}

        {/* Remaining cards — revealed on demand */}
        {showAll && hasMore && (
          <div ref={moreGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {restProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Show more / less toggle */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <Button
              variant="ghost"
              onClick={() => setShowAll((prev) => !prev)}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-zinc-800 hover:border-zinc-600 px-6 py-2.5 rounded-full transition-all duration-300"
            >
              {showAll ? (
                <>
                  <ChevronUp size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  {`Show ${restProjects.length} More Project${restProjects.length > 1 ? 's' : ''}`}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
