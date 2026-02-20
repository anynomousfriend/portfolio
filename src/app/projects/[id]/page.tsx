import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import { CaseStudyRenderer } from '@/components/ui/case-study-renderer';
import { Badge } from '@/components/ui/badge';
import { TechIcon } from '@/components/ui/tech-icon';
import { fetchReadme } from '@/lib/github-readme';

const allDevProjects = projects.dev.filter((p) => p.slug);

export function generateStaticParams() {
  return allDevProjects.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = allDevProjects.find((p) => p.slug === id);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.desc,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = allDevProjects.find((p) => p.slug === id);
  if (!project) notFound();

  // Fetch README from GitHub, fall back to hand-written case study
  let content: string | null = null;
  if (project.githubRepo) {
    content = await fetchReadme(
      project.githubRepo.split('/')[0],
      project.githubRepo.split('/')[1]
    );
  }
  if (!content) content = project.caseStudy ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky top nav */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to projects
          </Link>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={14} />
                <span className="hidden sm:inline">Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
              >
                <ExternalLink size={13} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero visual */}
        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-border mb-10 bg-zinc-950">
          {project.visual}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          {project.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
          {project.desc}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-12">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs"
            >
              <TechIcon name={tag} size={12} />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="h-px bg-border mb-12" />

        {/* README / case study content */}
        {content ? (
          <CaseStudyRenderer
            content={content}
            repoUrl={project.githubUrl}
          />
        ) : (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-sm">Case study coming soon.</p>
          </div>
        )}

        {/* Bottom links */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to all projects
          </Link>
          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={14} />
                View source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink size={14} />
                Live demo
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
