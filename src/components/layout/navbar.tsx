'use client';

import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const scrolled = useScrollPosition(50);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-foreground font-bold text-lg tracking-tight">
          Portfolio<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {['Skills', 'Experience', 'Projects'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="mailto:hello@example.com">
            Contact
          </a>
        </Button>
      </div>
    </nav>
  );
}
