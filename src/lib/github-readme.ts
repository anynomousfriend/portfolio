/**
 * Fetches and sanitizes a GitHub README for use as a case study.
 * - Resolves relative image paths to raw.githubusercontent.com
 * - Strips HTML block tags (div, details, summary, video, svg, style, script)
 * - Strips shield.io badge images
 * - Strips HTML comments
 * Runs server-side only (Next.js fetch with revalidation).
 */

const RAW_BASE = 'https://raw.githubusercontent.com';

function resolveImages(markdown: string, owner: string, repo: string, branch = 'main'): string {
  // Resolve markdown image syntax: ![alt](relative/path)
  markdown = markdown.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    (_, alt, src) => {
      const clean = src.startsWith('./') ? src.slice(2) : src;
      return `![${alt}](${RAW_BASE}/${owner}/${repo}/${branch}/${clean})`;
    }
  );
  // Resolve HTML <img src="relative"> tags
  markdown = markdown.replace(
    /<img([^>]*?)src="(?!https?:\/\/)([^"]+)"([^>]*?)>/gi,
    (_, pre, src, post) => {
      const clean = src.startsWith('./') ? src.slice(2) : src;
      return `<img${pre}src="${RAW_BASE}/${owner}/${repo}/${branch}/${clean}"${post}>`;
    }
  );
  return markdown;
}

function extractImagesFromHtmlTables(markdown: string): string {
  // Find <table>...</table> blocks and extract any <img> tags as markdown images
  return markdown.replace(/<table[\s\S]*?<\/table>/gi, (tableBlock) => {
    const imgs: string[] = [];
    const imgRegex = /<img[^>]*?src="([^"]+)"[^>]*?(?:alt="([^"]*)")?[^>]*?\/?>/gi;
    let match;
    while ((match = imgRegex.exec(tableBlock)) !== null) {
      const src = match[1];
      const alt = match[2] ?? '';
      // Skip shields
      if (src.includes('img.shields.io')) continue;
      imgs.push(`![${alt}](${src})`);
    }
    return imgs.length > 0 ? '\n\n' + imgs.join('\n\n') + '\n\n' : '';
  });
}

function sanitize(markdown: string): string {
  // Strip HTML comments
  markdown = markdown.replace(/<!--[\s\S]*?-->/g, '');

  // Strip block-level HTML tags and their content for tags we can't render nicely:
  // video, script, style, svg
  for (const tag of ['video', 'script', 'style', 'svg']) {
    markdown = markdown.replace(new RegExp(`<${tag}[\\s\\S]*?<\\/${tag}>`, 'gi'), '');
  }

  // Extract images from HTML <table> image grids, then drop the tables
  markdown = extractImagesFromHtmlTables(markdown);

  // Strip div/details/summary open+close tags but KEEP their inner content
  markdown = markdown.replace(/<\/?(div|details|summary|center|table|thead|tbody|tr|td|th)[^>]*>/gi, '');

  // Strip any remaining bare <img> HTML tags (convert to markdown syntax)
  markdown = markdown.replace(/<img[^>]*?src="([^"]+)"[^>]*?(?:alt="([^"]*)")?[^>]*?\/?>/gi, (_, src, alt) => {
    if (src.includes('img.shields.io')) return '';
    return `![${alt ?? ''}](${src})`;
  });

  // Strip shield.io badge images: [![...](https://img.shields.io/...)](...)
  markdown = markdown.replace(/\[!\[[^\]]*\]\(https?:\/\/img\.shields\.io[^)]*\)\]\([^)]*\)/g, '');
  // Also plain ![...](https://img.shields.io/...)
  markdown = markdown.replace(/!\[[^\]]*\]\(https?:\/\/img\.shields\.io[^)]*\)/g, '');

  // Strip lines that are purely a GitHub asset video URL (not wrapped in markdown)
  markdown = markdown.replace(/^https:\/\/github\.com\/user-attachments\/assets\/.*$/gm, '');

  // Collapse 3+ consecutive blank lines to 2
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  return markdown.trim();
}

export async function fetchReadme(
  owner: string,
  repo: string,
  branch = 'main'
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: { Accept: 'application/vnd.github.v3.raw' },
        next: { revalidate: 86400 }, // revalidate once per day
      }
    );
    if (!res.ok) return null;
    let content = await res.text();
    content = resolveImages(content, owner, repo, branch);
    content = sanitize(content);
    return content;
  } catch {
    return null;
  }
}
