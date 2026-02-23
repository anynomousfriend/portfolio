import { ArrowUpRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t py-12 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-foreground font-extrabold text-2xl mb-2 tracking-tight">
              Let&apos;s work together<span className="text-primary">.</span>
            </h2>
            <p className="text-muted-foreground text-sm font-medium">
              Always open to discussing new projects and creative ideas.
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { label: 'GitHub', href: 'https://github.com/anynomousfriend' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/subh-choudhury/' },
              { label: 'Twitter', href: 'https://x.com/SsubhankarX?t=S2s-0mx5Vex7yhfwe5iUng&s=09' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {link.label}
                <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
        <Separator className="mt-10" />
        <div className="mt-8 text-center text-muted-foreground text-xs font-medium">
          &copy; {new Date().getFullYear()} Portfolio. Built with <span className="text-muted-foreground">Next.js</span> &amp; <span className="text-muted-foreground">Tailwind CSS</span>.
        </div>
      </div>
    </footer>
  );
}
