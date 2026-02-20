'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('design');
  const filteredProjects = projects[activeTab];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
          <div>
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

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
