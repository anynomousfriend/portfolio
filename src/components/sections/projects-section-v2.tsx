'use client';

/**
 * Projects Section — Variant 2
 * Floating Dossier Card on hover
 *
 * The FlowingMenu shows all projects as kinetic rows.
 * Hovering a row materialises a rich "dossier" card anchored
 * to the right side of the section — image, description,
 * tech stack, and CTA pills. No clicks required to survey
 * the full project list.
 *
 * TO SWITCH: in src/app/page.tsx change the import to:
 *   import { ProjectsSection } from '@/components/sections/projects-section-v2';
 */

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, BookOpen, Star } from 'lucide-react';
import { projects } from '@/data/projects';
import { TechIcon } from '@/components/ui/tech-icon';
import FlowingMenu, { type FlowingMenuItemData } from '@/components/ui/flowing-menu';
import type { ProjectCategory, ProjectData } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-indigo-500/40 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all duration-200"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-200"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-600 text-zinc-400 hover:text-foreground hover:border-zinc-400 hover:bg-zinc-800/50 transition-all duration-200"
          >
            <Github size={10} />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('dev');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const allProjects = projects[activeTab];

  const menuItems: FlowingMenuItemData[] = allProjects.map((p) => ({
    text: p.title,
    coverImage: p.coverImage,
  }));

  const hoveredProject = hoveredIndex !== null ? allProjects[hoveredIndex] : null;

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
                onClick={() => { setActiveTab(tab); setHoveredIndex(null); }}
                variant={activeTab === tab ? 'default' : 'ghost'}
                size="sm"
                className={cn('capitalize transition-all duration-300', activeTab === tab && 'shadow-md')}
              >
                {tab === 'dev' ? 'Development' : 'Design'}
              </Button>
            ))}
          </div>
        </div>

        {/* Split layout: menu left, dossier right */}
        <div className="flex gap-8 items-stretch min-h-[520px]">
          {/* Flowing menu */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-800/60">
            <FlowingMenu
              items={menuItems}
              speed={18}
              onHover={setHoveredIndex}
              activeIndex={hoveredIndex}
            />
          </div>

          {/* Dossier panel */}
          <div className="w-[340px] shrink-0">
            <div
              className={cn(
                'h-full rounded-2xl border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm p-5 transition-all duration-500',
                hoveredProject
                  ? 'opacity-100 translate-x-0 shadow-2xl shadow-indigo-500/10 border-indigo-500/20'
                  : 'opacity-0 translate-x-4 pointer-events-none'
              )}
            >
              {hoveredProject && <DossierCard project={hoveredProject} />}
            </div>
            {!hoveredProject && (
              <div className="h-full rounded-2xl border border-dashed border-zinc-800/40 flex items-center justify-center">
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
