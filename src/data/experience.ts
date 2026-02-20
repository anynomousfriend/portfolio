import type { ExperienceData } from '@/types';

export const experience: ExperienceData[] = [
  {
    company: 'BuidlGuidl Batch 21',
    role: 'Full-Stack Web3 Developer — Scaffold-ETH Ecosystem',
    period: 'Oct – Nov 2025',
    description:
      'Built and shipped a full on-chain activity timeline for the Batch 21 cohort site, tracking every builder\'s journey from kickoff to graduation. Deployed a custom subgraph on The Graph (Arbitrum) to index BatchRegistry check-in events and Graduation NFT mints via GraphQL queries. Implemented three parallel React Query hooks — useCheckInEventsFromSubgraph, useGraduationNFTEventsFromSubgraph, and useGitHubPREvents — that merge and chronologically sort on-chain events with merged GitHub PRs from the batch repo. Built the BatchTimeline UI component with an alternating left-right card layout, type-specific styling (on-chain check-ins, graduation NFTs, merged PRs), animated milestones for kickoff and wrap-up dates, and a loading state with floating Ethereum logo animations. Also added a Batch Timeline nav link to the core Scaffold-ETH header, integrated IPFS via kubo-rpc-client, and managed graphql-request dependency upgrades across the Yarn 3 monorepo.',
    technologies: ['Scaffold-ETH', 'Next.js', 'TypeScript', 'The Graph', 'GraphQL', 'IPFS', 'Ethereum', 'React Query'],
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
