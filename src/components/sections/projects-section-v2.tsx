'use client';

/**
 * Projects Section — Variant 2
 * Floating Dossier Card on hover (desktop) / tap-to-expand accordion (mobile)
 *
 * Desktop (md+):
 *   FlowingMenu rows on the left, dossier card anchored to the right.
 *   Hovering a row materialises the card. Moving into the card keeps it
 *   alive so all CTAs are clickable.
 *
 * Mobile (<md):
 *   Each FlowingMenu row is a tap target. Tapping fires the same marquee
 *   highlight animation and expands an inline dossier card below the row
 *   with a smooth height animation. Tapping again (or tapping a different
 *   row) collapses it.
 *
 * TO SWITCH: in src/app/page.tsx change the import to:
 *   import { ProjectsSection } from '@/components/sections/projects-section-v2';
 */

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, BookOpen, Star, ChevronDown } from 'lucide-react';
import { projects } from '@/data/projects';
import { TechIcon } from '@/components/ui/tech-icon';
import FlowingMenu, { type FlowingMenuItemData } from '@/components/ui/flowing-menu';
import type { ProjectCategory, ProjectData } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Shared dossier content ───────────────────────────────────────────────────

function DossierCard({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col h-full">
      {/* Cover image */}
      {project.coverImage ? (
        <div
          className="w-full h-48 rounded-xl bg-cover bg-center shrink-0 mb-4"
          style={{ backgroundImage: `url(${project.coverImage})` }}
        />
      ) : (
        <div className="w-full h-48 rounded-xl shrink-0 mb-4 overflow-hidden">
          {project.visual}
        </div>
      )}

      {/* Title + featured */}
      <div className="flex items-start gap-2 mb-2">
        <h3 className="text-lg font-bold text-foreground leading-tight flex-1">{project.title}</h3>
        {project.featured && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 shrink-0">
            <Star size={8} className="fill-indigo-400 text-indigo-400" />
            Featured
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">{project.desc}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-zinc-800/80 border border-zinc-700/60 text-zinc-300"
          >
            <TechIcon name={tag} size={10} />
            {tag}
          </span>
        ))}
      </div>

      {/* CTA pills */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.slug && (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-indigo-500/40 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 active:bg-indigo-500/30 transition-all duration-200"
          >
            <BookOpen size={10} />
            Case Study
          </Link>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 transition-all duration-200"
          >
            <ExternalLink size={10} />
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-600 text-zinc-400 hover:text-foreground hover:border-zinc-400 hover:bg-zinc-800/50 active:bg-zinc-800/80 transition-all duration-200"
          >
            <Github size={10} />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Mobile accordion row ─────────────────────────────────────────────────────
// Wraps each FlowingMenu item on mobile: the row is the tap target and the
// dossier card expands below it with a CSS height transition.

function AccordionRow({
  project,
  isOpen,
  isFirst,
}: {
  project: ProjectData;
  isOpen: boolean;
  isFirst: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate height via JS so we get a smooth transition on all browsers
  // without knowing the content height upfront.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      // Collapse: first set explicit height to current, then to 0 so
      // CSS transition fires correctly.
      el.style.height = el.scrollHeight + 'px';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.height = '0px';
        });
      });
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        'border-zinc-800/60',
        !isFirst && 'border-t'
      )}
    >
      {/* Expandable dossier content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ height: 0 }}
      >
        <div className="px-4 pt-4 pb-5 bg-zinc-900/80 border-t border-indigo-500/20">
          <DossierCard project={project} />
          {/* Subtle close hint */}
          <div className="flex items-center justify-center gap-1 mt-4 text-zinc-600 text-[10px] uppercase tracking-widest">
            <ChevronDown size={10} className="rotate-180" />
            tap row to close
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile layout ────────────────────────────────────────────────────────────

function MobileProjectsList({
  allProjects,
}: {
  allProjects: ProjectData[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleTap = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="rounded-2xl border border-zinc-800/60 overflow-hidden">
      {allProjects.map((project, idx) => (
        <div key={idx}>
          {/* Row tap target */}
          <button
            type="button"
            className={cn(
              'w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200',
              'active:bg-indigo-500/10',
              idx !== 0 && 'border-t border-zinc-800/60',
              openIndex === idx
                ? 'bg-zinc-900/80 text-indigo-300'
                : 'bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800/40'
            )}
            onClick={() => handleTap(idx)}
          >
            <span className="font-semibold text-sm uppercase tracking-wide">{project.title}</span>
            <div className="flex items-center gap-2 shrink-0">
              {project.featured && (
                <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                  <Star size={8} className="fill-indigo-400 text-indigo-400" />
                  Featured
                </span>
              )}
              <ChevronDown
                size={16}
                className={cn(
                  'text-zinc-500 transition-transform duration-300',
                  openIndex === idx && 'rotate-180 text-indigo-400'
                )}
              />
            </div>
          </button>

          {/* Accordion dossier */}
          <AccordionRow
            project={project}
            isOpen={openIndex === idx}
            isFirst={idx === 0}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('dev');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHoveredIndexRef = useRef<number | null>(null);
  const cardHoveredRef = useRef(false);

  const allProjects = projects[activeTab];

  const menuItems: FlowingMenuItemData[] = allProjects.map((p) => ({
    text: p.title,
    coverImage: p.coverImage,
  }));

  const hoveredProject = hoveredIndex !== null ? allProjects[hoveredIndex] : null;

  // ── Desktop hover handlers ──────────────────────────────────────────────────

  const handleMenuHover = (index: number | null) => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (index !== null) {
      lastHoveredIndexRef.current = index;
      setHoveredIndex(index);
    } else {
      // Grace period so cursor can travel from row → dossier card
      hideTimerRef.current = setTimeout(() => {
        if (!cardHoveredRef.current) {
          setHoveredIndex(null);
          lastHoveredIndexRef.current = null;
        }
      }, 150);
    }
  };

  const handleCardMouseEnter = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    cardHoveredRef.current = true;
    if (lastHoveredIndexRef.current !== null) {
      setHoveredIndex(lastHoveredIndexRef.current);
    }
  };

  const handleCardMouseLeave = () => {
    cardHoveredRef.current = false;
    setHoveredIndex(null);
    lastHoveredIndexRef.current = null;
  };

  const resetState = (tab: ProjectCategory) => {
    setActiveTab(tab);
    setHoveredIndex(null);
    cardHoveredRef.current = false;
    lastHoveredIndexRef.current = null;
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Selected Work<span className="text-primary">.</span>
            </h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-muted-foreground max-w-lg text-lg">
              A curated collection of projects spanning{' '}
              <span className="text-foreground font-medium">design</span> and{' '}
              <span className="text-foreground font-medium">development</span>.
            </p>
          </div>
          <div className="flex gap-1 bg-card/80 backdrop-blur-sm rounded-lg p-1 border self-start sm:self-auto shadow-inner">
            {(['design', 'dev'] as ProjectCategory[]).map((tab) => (
              <Button
                key={tab}
                onClick={() => resetState(tab)}
                variant={activeTab === tab ? 'default' : 'ghost'}
                size="sm"
                className={cn('capitalize transition-all duration-300', activeTab === tab && 'shadow-md')}
              >
                {tab === 'dev' ? 'Development' : 'Design'}
              </Button>
            ))}
          </div>
        </div>

        {/* ── Mobile: accordion list (hidden on md+) ── */}
        <div className="md:hidden">
          <MobileProjectsList allProjects={allProjects} />
        </div>

        {/* ── Desktop: flowing menu + dossier panel (hidden below md) ── */}
        <div className="hidden md:flex gap-8 items-stretch min-h-[520px]">
          {/* Flowing menu */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-800/60">
            <FlowingMenu
              items={menuItems}
              speed={18}
              onHover={handleMenuHover}
              activeIndex={hoveredIndex}
            />
          </div>

          {/* Dossier panel */}
          <div className="w-[340px] shrink-0 relative">
            <div
              className={cn(
                'h-full rounded-2xl border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm p-5 transition-all duration-500',
                hoveredProject
                  ? 'opacity-100 translate-x-0 shadow-2xl shadow-indigo-500/10 border-indigo-500/20'
                  : 'opacity-0 translate-x-4 pointer-events-none'
              )}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              {hoveredProject && <DossierCard project={hoveredProject} />}
            </div>
            {!hoveredProject && (
              <div className="absolute inset-0 rounded-2xl border border-dashed border-zinc-800/40 flex items-center justify-center pointer-events-none">
                <p className="text-zinc-600 text-sm text-center px-4">
                  Hover a project<br />to see details
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
