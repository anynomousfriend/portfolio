import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { TechIcon } from '@/components/ui/tech-icon';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProjectData } from '@/types';

type ProjectCardProps = {
  project: ProjectData;
};

function CtaPills({ project }: { project: ProjectData }) {
  const hasCtAs = project.liveUrl || project.githubUrl;
  if (!hasCtAs) return null;

  return (
    <div className="flex gap-2 pt-3 px-1">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-primary/40 text-primary bg-primary/5 hover:bg-primary/15 hover:border-primary/70 transition-all duration-200"
        >
          <ExternalLink size={11} />
          Live Demo
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-muted/50 transition-all duration-200"
        >
          <Github size={11} />
          GitHub
        </a>
      )}
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardBody = (
    <Card className="group relative overflow-hidden hover:border-border/80 transition-all duration-500 flex flex-col h-full gap-0">
      {/* Visual area */}
      <div className="relative h-44 overflow-hidden shrink-0 -m-6 mb-0">{project.visual}</div>

      {/* Content */}
      <CardHeader className="space-y-2 pb-3 pt-4">
        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
          {project.title}
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed line-clamp-2">
          {project.desc}
        </CardDescription>
      </CardHeader>

      {/* Tech Stack Icons */}
      <CardFooter className="flex flex-wrap gap-1.5 pt-0 pb-4 mt-auto border-t">
        {project.tags.map((tag, i) => (
          <div key={i} className="group/icon relative">
            <Badge
              variant="outline"
              className="p-1.5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-help"
            >
              <TechIcon name={tag} size={12} />
            </Badge>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border shadow-xl z-20">
              {tag}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
            </div>
          </div>
        ))}
      </CardFooter>
    </Card>
  );

  // Cards with a slug link the whole card — CTAs must live outside the <Link> to avoid nested <a> tags
  if (project.slug) {
    return (
      <div className="flex flex-col h-full">
        <Link href={`/projects/${project.slug}`} className="block flex-1">
          {cardBody}
        </Link>
        <CtaPills project={project} />
      </div>
    );
  }

  // No slug — no nested anchor conflict, render pills inside normally
  return (
    <div className="flex flex-col h-full">
      {cardBody}
      <CtaPills project={project} />
    </div>
  );
}
