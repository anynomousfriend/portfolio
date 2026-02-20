'use client';

import { 
  Code2, 
  Figma, 
  LayoutTemplate, 
  Server, 
  Box, 
  Globe, 
  Cpu,
  Palette,
  Trello,
  Database,
  Smartphone,
  Search,
  PenTool,
  AppWindow,
  Layers
} from 'lucide-react';

// Map of tech names to SimpleIcons slugs
// Special cases can define a color override if the brand color is too dark for the UI
const iconMap: Record<string, string | { slug: string; color?: string }> = {
  'react': 'react',
  'next.js': { slug: 'nextdotjs', color: 'white' }, // Force white for dark mode
  'node.js': 'nodedotjs',
  'figma': 'figma',
  'sketch': 'sketch',
  'adobe xd': 'adobexd',
  'storybook': 'storybook',
  'jira': 'jira',
  'webgl': 'opengl', // Fallback as WebGL has no official separate logo usually, or use generic
  'three.js': { slug: 'threedotjs', color: 'white' },
  'javascript': 'javascript',
  'typescript': 'typescript',
  'html/scss': 'sass',
  'postgresql': 'postgresql',
  'python': 'python',
  'api': 'postman', // Using Postman for API symbol or fallback
  'gsap': 'greensock',
  'tailwind': 'tailwindcss',
  'tailwind css': 'tailwindcss',
  'vercel': { slug: 'vercel', color: 'white' },
  'github': { slug: 'github', color: 'white' },
  'html': 'html5',
  'css': 'css3',
  'supabase': 'supabase',
  'bun': { slug: 'bun', color: 'fbf0df' }, // Bun peach/cream color
  // Web3 / Blockchain
  'solidity': 'solidity',
  'ethereum': 'ethereum',
  'hardhat': { slug: 'hardhat', color: 'f7c948' },
  'wagmi': { slug: 'wagmi', color: 'white' },
  'viem': { slug: 'viem', color: 'white' },
  'ipfs': 'ipfs',
  'redis': 'redis',
  'docker': 'docker',
  'arbitrum': { slug: 'arbitrum', color: '28a0f0' },
  // Platforms / frameworks referenced in projects
  'scaffold-eth': { slug: 'ethereum', color: '627eea' },
  'next.js 15': { slug: 'nextdotjs', color: 'white' },
  'shadcn/ui': { slug: 'shadcnui', color: 'white' },
  'framer motion': 'framer',
  'stacks': { slug: 'stacks', color: 'white' },
  'clarity': { slug: 'stacks', color: 'white' },
  // Data / query
  'the graph': { slug: 'thegraph', color: 'white' },
  'graphql': 'graphql',
  'react query': { slug: 'reactquery', color: 'white' },
};

// Fallback Lucide icons for concepts
const getLucideIcon = (name: string, size: number) => {
  const t = name.toLowerCase();
  if (t.includes('mobile') || t.includes('app')) return <Smartphone size={size} />;
  if (t.includes('ui/ux') || t.includes('design') || t.includes('branding')) return <Palette size={size} />;
  if (t.includes('prototyping')) return <LayoutTemplate size={size} />;
  if (t.includes('research')) return <Search size={size} />;
  if (t.includes('print') || t.includes('identity')) return <PenTool size={size} />;
  if (t.includes('data') || t.includes('sql')) return <Database size={size} />;
  if (t.includes('server') || t.includes('backend')) return <Server size={size} />;
  if (t.includes('web')) return <Globe size={size} />;
  if (t.includes('system')) return <Layers size={size} />;
  return <Code2 size={size} />;
};

type TechIconProps = {
  name: string;
  size?: number;
};

export function TechIcon({ name, size = 16 }: TechIconProps) {
  const key = name.toLowerCase();
  const iconDef = iconMap[key];

  if (iconDef) {
    const slug = typeof iconDef === 'string' ? iconDef : iconDef.slug;
    const color = typeof iconDef === 'object' ? iconDef.color : undefined;
    
    // Construct URL: cdn.simpleicons.org/SLUG/COLOR (color is optional)
    const src = `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ''}`;

    return (
      <img 
        src={src} 
        alt={name} 
        width={size} 
        height={size} 
        className="object-contain"
        style={{ width: size, height: size }}
      />
    );
  }

  // Fallback for special cases not in map or concepts
  if (key === 'webgl') return <Box size={size} />;
  
  return getLucideIcon(name, size);
}
