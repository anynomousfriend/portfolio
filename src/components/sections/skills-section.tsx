'use client';

import { skills } from '@/data/skills';
import { SkillCard } from '@/components/ui/skill-card';

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            What I Do<span className="text-primary">.</span>
          </h2>
          <div className="w-16 h-1 bg-primary mb-6" />
          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
            A blend of <span className="text-foreground font-medium">design thinking</span> and <span className="text-foreground font-medium">technical execution</span>, from concept to shipped product.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.title} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
