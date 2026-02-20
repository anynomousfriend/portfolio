'use client';

import { TechIcon } from './tech-icon';
import { Badge } from './badge';

type TechBadgeProps = {
  tech: string;
};

export function TechBadge({ tech }: TechBadgeProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent('robot:techbadge', {
        detail: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          tech,
        },
      })
    );
  };

  const handleMouseLeave = () => {
    window.dispatchEvent(new CustomEvent('robot:techbadge:leave'));
  };

  return (
    <div
      className="group/icon relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Badge
        variant="outline"
        className="p-1.5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-help"
      >
        <TechIcon name={tech} size={14} />
      </Badge>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border shadow-xl z-20">
        {tech}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
      </div>
    </div>
  );
}
