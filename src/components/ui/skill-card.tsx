'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SkillData } from '@/types';

type SkillCardProps = {
  skill: SkillData;
};

export function SkillCard({ skill }: SkillCardProps) {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <Card
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${skill.size} group hover:border-border/80 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[200px]`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{skill.icon}</span>
          <CardTitle className="text-sm">{skill.title}</CardTitle>
        </div>
        <CardDescription className="text-xs">{skill.desc}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex items-center justify-center w-full relative min-h-[140px]">
        {skill.renderVisual(inView)}
      </CardContent>
    </Card>
  );
}
