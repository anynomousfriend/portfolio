import type { ExperienceData } from '@/types';

export const experience: ExperienceData[] = [
  {
    company: 'BuidlGuidl Batch 21',
    role: 'Full-Stack Web3 Developer — Scaffold-ETH Ecosystem',
    period: 'Oct – Nov 2025',
    description:
      'Engineered a comprehensive activity timeline for the BuidlGuidl Batch 21 cohort, tracking builder progress from kickoff to graduation. Built a custom data aggregation layer using React Query that concurrently fetches and chronologically merges on-chain events (check-ins and NFT mints) from an Arbitrum subgraph via GraphQL, alongside off-chain pull requests from the GitHub API. Developed a responsive, alternating timeline UI in Next.js featuring type-specific event badges, animated loading states, and direct Arbiscan integration. Seamlessly integrated the feature into the core Scaffold-ETH frontend architecture.',
    technologies: ['Scaffold-ETH', 'Next.js', 'TypeScript', 'The Graph', 'GraphQL', 'React Query', 'Tailwind CSS'],
    liveUrl: 'https://batch21.buidlguidl.com/timeline',
  },
  {
    company: 'TechNova Corp',
    role: 'Senior Product Designer',
    period: '2022 - Present',
    description:
      'Leading the design system initiative and overseeing user experience for the core SaaS product suite. Improved user retention by 15% through iterative UX enhancements.',
    technologies: ['Figma', 'React', 'Storybook', 'Jira'],
  },
  {
    company: 'Creative Pulse Studios',
    role: 'Full Stack Developer',
    period: '2020 - 2022',
    description:
      'Developed high-performance marketing websites and web applications for Fortune 500 clients. Specialized in creating immersive, interactive frontend experiences.',
    technologies: ['Next.js', 'Node.js', 'WebGL', 'Three.js'],
  },
  {
    company: 'Apex Solutions',
    role: 'UI/UX Designer',
    period: '2018 - 2020',
    description:
      'Partnered with startups to launch MVPs. Handled end-to-end product lifecycle from initial sketches and wireframes to high-fidelity prototypes and developer handoff.',
    technologies: ['Sketch', 'HTML/SCSS', 'JavaScript', 'Adobe XD'],
  },
];
