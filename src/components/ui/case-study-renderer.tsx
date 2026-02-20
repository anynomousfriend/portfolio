'use client';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface CaseStudyRendererProps {
  content: string;
  className?: string;
  repoUrl?: string;
}

export function CaseStudyRenderer({ content, className, repoUrl }: CaseStudyRendererProps) {
  return (
    <div className={cn('w-full', className)}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          // H1 — project title (already shown in hero, skip rendering)
          h1: () => null,

          // H2 — major sections
          h2: ({ children }) => (
            <div className="mt-14 mb-5 first:mt-0">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1 h-6 bg-primary rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-foreground tracking-tight">{children}</h2>
              </div>
              <div className="h-px bg-border ml-4" />
            </div>
          ),

          // H3 — subsections
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-foreground mt-8 mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-primary inline-block" />
              {children}
            </h3>
          ),

          // H4
          h4: ({ children }) => (
            <h4 className="text-sm font-semibold text-foreground mt-5 mb-2">{children}</h4>
          ),

          // Paragraphs — handle special cases to avoid invalid HTML nesting
          p: ({ children }) => {
            const kids = Array.isArray(children) ? children : [children];

            // Case 1: only child is an img → <figure> (avoids <div>/<img> inside <p>)
            const hasOnlyImg =
              kids.length === 1 &&
              kids[0] &&
              typeof kids[0] === 'object' &&
              (kids[0] as any)?.type === 'img';
            if (hasOnlyImg) return <figure className="my-6">{children}</figure>;

            // Case 2: ASCII art — box-drawing characters need monospace + whitespace preserved
            const text = kids.map((k) => (typeof k === 'string' ? k : '')).join('');
            const isAsciiArt = /[┌┐└┘│─┼┬┴├┤╔╗╚╝║═▶◀▲▼→←↑↓]/.test(text);
            if (isAsciiArt) {
              return (
                <pre className="my-6 overflow-x-auto rounded-lg bg-zinc-950 border border-border p-4 text-[12px] font-mono text-zinc-300 leading-relaxed whitespace-pre">
                  {children}
                </pre>
              );
            }

            // Case 3: contains a block-level child (e.g. inline code that rendered a div/pre)
            // Use a <div> wrapper to avoid invalid <p><div>...</div></p> nesting
            const hasBlockChild = kids.some(
              (k) =>
                k &&
                typeof k === 'object' &&
                typeof (k as any)?.type === 'string' &&
                ['div', 'pre', 'figure', 'ul', 'ol', 'table'].includes((k as any).type)
            );
            if (hasBlockChild) {
              return <div className="text-sm leading-7 text-muted-foreground mb-4">{children}</div>;
            }

            return <p className="text-sm leading-7 text-muted-foreground mb-4">{children}</p>;
          },

          // Strong — used for key terms
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),

          // Em
          em: ({ children }) => (
            <em className="italic text-muted-foreground">{children}</em>
          ),

          // Links
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              {children}
            </a>
          ),

          // Pre — handles ALL fenced code blocks (react-markdown v9 pattern)
          // Block code lives here; inline code is handled by the code component below
          pre: ({ children, ...props }: any) => {
            // Extract the inner <code> element to get its className and text
            const codeEl = Array.isArray(children) ? children[0] : children;
            const cls: string = codeEl?.props?.className ?? '';
            const lang = cls.replace('language-', '');
            const text: string =
              typeof codeEl?.props?.children === 'string'
                ? codeEl.props.children
                : String(codeEl?.props?.children ?? '');

            // Tree / ASCII art — plain pre, no chrome
            const isTree = /[├└│─┌┐┘┼┬┴┤]/.test(text);
            if (isTree) {
              return (
                <pre className="my-6 overflow-x-auto rounded-lg bg-zinc-950 border border-border p-4 text-[12px] font-mono text-zinc-300 leading-relaxed whitespace-pre">
                  {text}
                </pre>
              );
            }

            // Regular code block with macOS chrome
            return (
              <div className="my-6 rounded-lg overflow-hidden border border-border">
                {lang && (
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{lang}</span>
                  </div>
                )}
                <pre className="bg-zinc-950 overflow-x-auto" {...props}>
                  <code className="block p-4 text-[13px] font-mono text-zinc-300 leading-relaxed">
                    {text}
                  </code>
                </pre>
              </div>
            );
          },

          // Code — inline only (block code is handled by pre above)
          code: ({ children, ...props }: any) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-[12px] font-mono text-primary" {...props}>
              {children}
            </code>
          ),

          // Unordered list
          ul: ({ children }) => (
            <ul className="mb-5 space-y-2 ml-1">{children}</ul>
          ),

          // Ordered list
          ol: ({ children }) => (
            <ol className="mb-5 space-y-2 ml-1 list-decimal list-inside">{children}</ol>
          ),

          // List item
          li: ({ children }) => (
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
              <span>{children}</span>
            </li>
          ),

          // Blockquote — callout style
          blockquote: ({ children }) => (
            <blockquote className="my-6 pl-4 border-l-2 border-primary bg-primary/5 py-3 pr-4 rounded-r-lg">
              <div className="text-sm italic text-muted-foreground leading-relaxed">{children}</div>
            </blockquote>
          ),

          // Table
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50 border-b border-border">{children}</thead>
          ),
          tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-muted-foreground">{children}</td>
          ),

          // Images — skip shields, resolve relative paths
          // NOTE: must return plain <img> (no wrapping div) to avoid <div> inside <p>
          // The parent <p> component detects img-only paragraphs and uses <figure> instead
          img: ({ src, alt }) => {
            let resolvedSrc = (typeof src === 'string' ? src : '') ?? '';
            if (!resolvedSrc.startsWith('http') && repoUrl) {
              const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
              if (match) {
                resolvedSrc = `https://raw.githubusercontent.com/${match[1]}/${match[2]}/main/${resolvedSrc}`;
              }
            }
            if (!resolvedSrc || resolvedSrc.includes('img.shields.io')) return null;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resolvedSrc}
                alt={alt ?? ''}
                className="w-full h-auto object-contain rounded-lg border border-border"
                loading="lazy"
              />
            );
          },

          // HR
          hr: () => <div className="my-10 h-px bg-border" />,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
