import { Briefcase, ExternalLink } from 'lucide-react';
import { experience } from '@/data/experience';
import { TechBadge } from '@/components/ui/tech-badge';
import { Badge } from '@/components/ui/badge';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto bg-background relative z-10">
      <div className="mb-12">
        <h2 className="text-3xl font-extrabold text-foreground mb-4 tracking-tight">Work History</h2>
        <div className="w-16 h-1 bg-primary mb-6" />
        <p className="text-muted-foreground max-w-lg leading-relaxed text-sm">
          A timeline of my professional journey, <span className="text-foreground font-medium">building products</span> and <span className="text-foreground font-medium">leading teams</span> across various industries.
        </p>
      </div>

      <div className="relative pl-4 md:pl-0">
        {/* Vertical Base Line */}
        <div className="absolute left-[19px] md:left-0 top-2 bottom-0 w-px bg-border" />

        <div className="space-y-12">
          {experience.map((job, index) => (
            <div key={index} className="group relative pl-12 md:pl-10 transition-all duration-500">

              {/* Timeline Node (Diamond) */}
              <div className="absolute left-[14px] md:left-[-5px] top-2.5 w-[11px] h-[11px] bg-background border-2 border-muted-foreground rotate-45 group-hover:bg-primary/20 group-hover:border-primary transition-all duration-300 z-10 shadow-[0_0_0_4px_var(--background)]" />

              {/* Connecting Highlight Line */}
              {index !== experience.length - 1 && (
                <div className="absolute left-[19px] md:left-0 top-[22px] bottom-[-48px] w-px bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-in-out" />
              )}

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

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-xl group-hover:text-foreground transition-colors">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {job.technologies.map((tech, i) => (
                  <TechBadge key={i} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
