'use client';

import { TechIcon } from '@/components/ui/tech-icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const TechPill = ({ name }: { name: string }) => (
  <Badge
    variant="outline"
    className="inline-flex items-center gap-1.5 align-middle px-2 py-0.5 text-sm mx-1 hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default whitespace-nowrap translate-y-[-2px]"
  >
    <TechIcon name={name} size={14} />
    <span className="font-medium">{name}</span>
  </Badge>
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
      <div className="relative z-10 w-full px-6 max-w-4xl mx-auto">
        {/* Hire badge - Polished squared look */}
        <Badge
          id="hire-badge"
          variant="outline"
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 cursor-pointer hover:border-primary/50 hover:bg-card transition-all duration-300 shadow-sm"
        >
          <div className="flex items-center justify-center w-5 h-5 rounded bg-primary/10">
            <Sparkles size={12} className="text-primary" />
          </div>
          <span className="text-xs font-medium">Available for hire</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse ml-1" />
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1] text-left">
          Design &amp; Code
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-zinc-400">
            That Delivers
          </span>
        </h1>

        <div className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-[2] text-left">
          I build interactive web apps using
          <TechPill name="Typescript" />
          ,
          <TechPill name="React" />
          ,
          <TechPill name="Next.js" />
          ,
          <TechPill name="Bun" />
          and
          <TechPill name="PostgreSQL" />
          . With a focus on
          <TechPill name="UI/UX" />
          design. Enthusiastic about
          <TechPill name="Three.js" />
          , driven by a keen eye for design.
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Button size="lg" asChild>
            <a href="#projects" className="group">
              View Projects
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#experience">
              My Experience
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
