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
    company: 'PoolFunders',
    role: 'Product Designer',
    period: '2023',
    description:
      'Spearheaded the end-to-end product design for the world\'s first DeFi reward-based crowdfunding platform tailored for startups and creators. My primary challenge was translating complex DeFi mechanisms—such as staking $TPFT for governance rights, DAO participation, and NFT-based reward investments—into an intuitive, accessible user experience for non-crypto-native backers and artists. I designed distinct, user-centric flows for raising funds, investing, and staking, ensuring that trust and transparency were centralized in the UI to encourage global participation in the platform\'s DAO governance model.',
    technologies: ['Figma', 'UI/UX Design', 'DeFi', 'Prototyping', 'User Research'],
    liveUrl: 'https://www.poolfunders.com/',
  },
  {
    company: 'Foliobull',
    role: 'Product Designer',
    period: '2023',
    description:
      'Led the product design for an AI-driven digital asset portfolio management platform. To solve the problem of fragmented crypto tracking, I designed a unified dashboard that seamlessly aggregates data from multiple exchanges (Binance, Coinbase, Kraken, etc.) via API integrations. My focus was on creating clear, nested graphical representations of portfolios and simplifying manual trading functions for digital coins and NFTs. I prioritized data visualization and intuitive UX to empower users with bias-free market analysis and real-time insights without needing multiple applications.',
    technologies: ['Figma', 'UI/UX Design', 'Data Visualization', 'Web3', 'Dashboard Design'],
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
