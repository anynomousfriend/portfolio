import type { ExperienceData } from '@/types';

export const experience: ExperienceData[] = [
  {
    company: 'Freelance',
    role: 'Lead Product Designer',
    period: '2024 - Present',
    location: 'Remote',
    description:
      'Partnered with diverse B2B and B2C clients to architect specialized applications from zero to one. For a **Risk Management SaaS**, I applied *Miller’s Law* to chunk dense financial data into digestible widget dashboards, significantly reducing cognitive overload for analysts. In a **Lawyer’s SaaS** platform, I utilized *Fitts’s Law* to position high-frequency case management actions prominently, accelerating document workflows. For **Medical Apps**, I mapped critical patient journeys using the *Peak-End Rule*, ensuring positive emotional resonance during appointment bookings and test result reviews. Additionally, I designed intuitive **Productivity Apps**, leveraging the *Zeigarnik Effect* through visual progress indicators to drive task completion rates and long-term user habit formation.',
    technologies: ['Figma', 'UX Laws', 'Prototyping', 'User Research', 'SaaS Design'],
  },
  {
    company: 'BuidlGuidl Batch 21',
    role: 'Full-Stack Web3 Developer — Scaffold-ETH Ecosystem',
    period: 'Oct – Nov 2025',
    location: 'Remote / Online',
    description:
      'Engineered a comprehensive activity timeline for the BuidlGuidl Batch 21 cohort, tracking builder progress from kickoff to graduation. Built a custom data aggregation layer using React Query that concurrently fetches and chronologically merges on-chain events (check-ins and NFT mints) from an Arbitrum subgraph via GraphQL, alongside off-chain pull requests from the GitHub API. Developed a responsive, alternating timeline UI in Next.js featuring type-specific event badges, animated loading states, and direct Arbiscan integration. Seamlessly integrated the feature into the core Scaffold-ETH frontend architecture.',
    technologies: ['Scaffold-ETH', 'Next.js', 'TypeScript', 'The Graph', 'GraphQL', 'React Query', 'Tailwind CSS'],
    liveUrl: 'https://batch21.buidlguidl.com/timeline',
  },
  {
    company: 'PoolFunders',
    role: 'Product Designer',
    period: '2023',
    location: 'Remote',
    description:
      'Spearheaded the end-to-end product design for the world\'s first DeFi reward-based crowdfunding platform tailored for startups and creators. My primary challenge was translating complex DeFi mechanisms—such as staking $TPFT for governance rights, DAO participation, and NFT-based reward investments—into an intuitive, accessible user experience for non-crypto-native backers and artists. I designed distinct, user-centric flows for raising funds, investing, and staking, ensuring that trust and transparency were centralized in the UI to encourage global participation in the platform\'s DAO governance model.',
    technologies: ['Figma', 'UI/UX Design', 'DeFi', 'Prototyping', 'User Research'],
    liveUrl: 'https://www.poolfunders.com/',
  },
  {
    company: 'Foliobull',
    role: 'Product Designer',
    period: '2023',
    location: 'Remote',
    description:
      'Led the product design for an AI-driven digital asset portfolio management platform. To solve the problem of fragmented crypto tracking, I designed a unified dashboard that seamlessly aggregates data from multiple exchanges (Binance, Coinbase, Kraken, etc.) via API integrations. My focus was on creating clear, nested graphical representations of portfolios and simplifying manual trading functions for digital coins and NFTs. I prioritized data visualization and intuitive UX to empower users with bias-free market analysis and real-time insights without needing multiple applications.',
    technologies: ['Figma', 'UI/UX Design', 'Data Visualization', 'Web3', 'Dashboard Design'],
  },
];
