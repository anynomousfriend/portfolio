import type { ProjectData, ProjectCategory } from '@/types';
import {
  PayPerRequestVisual,
  TemporalVaultVisual,
  ZKConsentVisual,
  ZenResumeVisual,
  LLMChessVisual,
  IExecVisual,
} from '@/components/ui/project-visuals';

export const projects: Record<ProjectCategory, ProjectData[]> = {
  design: [
    {
      id: 1,
      title: 'Fintech Dashboard',
      desc: 'A comprehensive financial interface focusing on data visualization and dark mode accessibility.',
      tags: ['UI/UX', 'Figma', 'Design System'],
      visual: (
        <div className="w-full h-full bg-zinc-900 p-2 flex flex-col gap-1.5 group-hover:bg-zinc-800/50 transition-colors">
          <div className="w-full h-3 bg-zinc-800 rounded-sm flex justify-between items-center px-1.5 group-hover:bg-zinc-700/50 transition-colors shrink-0">
            <div className="w-6 h-0.5 bg-zinc-700 rounded-full group-hover:bg-zinc-500/50 transition-colors" />
            <div className="flex gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-zinc-500/50 group-hover:bg-zinc-500 transition-colors" /></div>
          </div>
          <div className="flex gap-1.5 flex-1 min-h-0">
            <div className="w-6 bg-zinc-800 rounded-sm flex flex-col gap-1 p-0.5 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full aspect-square bg-zinc-700/50 rounded-sm group-hover:bg-zinc-500/30 transition-colors" />
              <div className="w-full aspect-square bg-zinc-700/50 rounded-sm" />
              <div className="w-full aspect-square bg-zinc-700/50 rounded-sm" />
            </div>
            <div className="flex-1 flex flex-col gap-1.5 min-h-0">
              <div className="grid grid-cols-2 gap-1.5 shrink-0">
                <div className="h-10 bg-zinc-800 rounded-sm p-1.5 flex flex-col justify-between group-hover:scale-105 transition-transform">
                  <div className="w-3 h-3 rounded-full bg-zinc-500/20 flex items-center justify-center text-zinc-500 text-[7px] group-hover:bg-zinc-500/40 transition-colors">$</div>
                  <div className="w-8 h-0.5 bg-zinc-700 rounded-full group-hover:w-10 transition-all" />
                </div>
                <div className="h-10 bg-zinc-800 rounded-sm p-1.5 flex flex-col justify-between group-hover:scale-105 transition-transform delay-75">
                  <div className="w-3 h-3 rounded-full bg-zinc-500/20 flex items-center justify-center text-zinc-500 text-[7px] group-hover:bg-zinc-500/40 transition-colors">%</div>
                  <div className="w-6 h-0.5 bg-zinc-700 rounded-full group-hover:w-8 transition-all" />
                </div>
              </div>
              <div className="flex-1 bg-zinc-800 rounded-sm relative overflow-hidden flex items-end justify-around p-1.5 pb-0 gap-0.5 group-hover:bg-zinc-700/50 transition-colors min-h-0">
                <div className="w-full bg-zinc-500/60 h-[40%] group-hover:h-[75%] transition-all duration-500 ease-out rounded-t-sm cursor-pointer" />
                <div className="w-full bg-zinc-700 h-[60%] group-hover:h-[35%] transition-all duration-500 ease-out delay-50 rounded-t-sm cursor-pointer" />
                <div className="w-full bg-zinc-500/60 h-[30%] group-hover:h-[85%] transition-all duration-500 ease-out delay-100 rounded-t-sm cursor-pointer" />
                <div className="w-full bg-zinc-700 h-[80%] group-hover:h-[45%] transition-all duration-500 ease-out delay-150 rounded-t-sm cursor-pointer" />
                <div className="w-full bg-zinc-500/60 h-[50%] group-hover:h-[95%] transition-all duration-500 ease-out delay-200 rounded-t-sm cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'E-Commerce Mobile App',
      desc: 'End-to-end product design for a luxury fashion retailer, featuring gesture-based navigation.',
      tags: ['Mobile', 'Prototyping', 'User Research'],
      visual: (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800/50 transition-colors p-2">
          <div className="relative w-20 h-36 border-2 border-zinc-700 rounded-lg bg-black overflow-hidden shadow-xl group-hover:scale-[1.15] group-hover:rotate-2 transition-all duration-500 cursor-pointer">
            <div className="h-4 w-full bg-zinc-900 flex items-center justify-between px-1.5">
              <div className="w-3 h-0.5 bg-zinc-600 rounded group-hover:bg-zinc-500/50 transition-colors" />
              <div className="w-6 h-0.5 bg-zinc-600 rounded" />
            </div>
            <div className="w-full h-16 bg-zinc-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-zinc-600/40 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-zinc-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <div className="p-1.5 space-y-1">
              <div className="w-12 h-1 bg-zinc-700 rounded group-hover:w-14 transition-all" />
              <div className="w-8 h-1 bg-zinc-800 rounded group-hover:w-10 transition-all delay-75" />
              <div className="mt-1.5 w-full h-4 bg-zinc-600 rounded flex items-center justify-center group-hover:bg-zinc-500 transition-colors">
                <div className="w-10 h-0.5 bg-white/50 rounded group-hover:w-14 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Brand Identity: 'Apex'",
      desc: 'Complete rebranding package including logo, typography, and marketing assets.',
      tags: ['Branding', 'Identity', 'Print'],
      visual: (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative overflow-hidden group-hover:bg-zinc-800/50 transition-colors cursor-pointer">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute w-16 h-16 border border-zinc-700 rounded-full group-hover:scale-[1.4] transition-transform duration-700 opacity-40 group-hover:border-zinc-500/50" />
            <div className="absolute w-16 h-16 border border-zinc-700 rounded-full group-hover:scale-[0.6] transition-transform duration-700 delay-100 opacity-40 group-hover:border-zinc-500/50" />
            <div className="relative z-10 w-12 h-12 border-2 border-zinc-500 transform rotate-45 group-hover:rotate-[405deg] transition-transform duration-1000 ease-in-out group-hover:scale-110">
              <div className="absolute top-0 right-0 w-full h-full bg-zinc-500/20 backdrop-blur-sm group-hover:bg-zinc-500/40 transition-colors" />
            </div>
            <div className="absolute z-20 w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform" />
          </div>
        </div>
      ),
    },
  ],
  dev: [
    {
      id: 1,
      title: 'PayPerRequest',
      slug: 'pay-per-request',
      githubUrl: 'https://github.com/anynomousfriend/payperrequest',
      githubRepo: 'anynomousfriend/payperrequest',
      desc: 'Blockchain API monetization platform — accept crypto micropayments for API access via HTTP 402, supporting 8+ EVM chains with a 3-line TypeScript SDK.',
      tags: ['TypeScript', 'Next.js', 'Solidity', 'PostgreSQL', 'Redis', 'Wagmi'],
      visual: <PayPerRequestVisual />,
      caseStudy: `# PayPerRequest

## The Problem

Developers building APIs have no easy way to monetize them without complex subscription billing infrastructure. Meanwhile, API consumers are forced into expensive monthly plans even for occasional usage. The HTTP 402 "Payment Required" status code has existed since 1991 — but nobody had built a production-ready system around it.

## The Solution

PayPerRequest is a full-stack blockchain payment gateway that lets developers gate any API endpoint behind a crypto micropayment. Drop in three lines of SDK code, and your endpoint instantly accepts payments across 8+ EVM chains.

\`\`\`ts
import ppr from 'payperrquest'
const api = ppr('your-api-key')
export default api.protect(yourHandler)
\`\`\`

## What I Built

### TypeScript SDK
A client library that handles payment negotiation transparently. When a consumer hits a protected endpoint without payment, they receive a 402 response with payment details. The SDK auto-retries after on-chain confirmation.

### Smart Contracts
Solidity contracts deployed on Base Sepolia using Hardhat and OpenZeppelin. Contracts handle payment escrow, per-request verification, and multi-chain routing. Comprehensive test coverage with automated deployment pipelines.

### API Gateway
Next.js middleware proxy with Redis-based rate limiting, PostgreSQL analytics, and real-time webhook delivery. Handles 100+ concurrent API keys with sub-50ms overhead per request.

### Dashboard
Real-time payment tracking UI built with Wagmi, RainbowKit, and DaisyUI. Displays usage analytics, revenue charts, and multi-wallet management.

## Technical Challenges

**On-chain verification latency** — Waiting for block confirmations before serving responses would kill UX. Solved with optimistic responses + async verification with automatic refund on failed confirmation.

**Multi-chain state** — Each chain has different finality guarantees. Built a chain-aware confirmation module that applies correct thresholds per network (1 block on Base, 3 on Polygon, etc.).

## Impact

- Zero platform fees — developers keep 100% of revenue
- 3-line integration — from zero to monetized in under a minute
- 8+ EVM chains supported out of the box
- Production-ready with comprehensive error handling and retry logic
`,
    },
    {
      id: 2,
      title: 'Temporal Vault',
      slug: 'temporal-vault',
      githubUrl: 'https://github.com/anynomousfriend/Temporal-Vault',
      githubRepo: 'anynomousfriend/Temporal-Vault',
      desc: 'Cross-chain DeFi protocol that tokenizes pending bridge claims as SIP-009 NFTs — trade your 15-20min Ethereum→Stacks wait time for instant liquidity at a 1-3% discount.',
      tags: ['Clarity', 'TypeScript', 'Next.js', 'Ethereum', 'Stacks', 'Viem'],
      visual: <TemporalVaultVisual />,
      caseStudy: `# Temporal Vault

## The Problem

Cross-chain bridges lock your capital for 15–20 minutes during transfers. In volatile markets, that waiting time has real cost — missed trades, liquidation risk, opportunity cost. The bridge claim exists on-chain but is completely illiquid.

## The Solution

Temporal Vault introduces **Liquidity-for-Time (LFT)** — a DeFi primitive that tokenizes pending bridge claims as SIP-009 NFTs on the Stacks blockchain. Users can sell their claim immediately at a 1–3% discount. Buyers earn the spread by waiting for bridge completion.

## What I Built

### Clarity Smart Contracts
SIP-009 NFT contracts on Stacks implementing the full marketplace: listing, buying, slippage protection, and emergency pause. Post-conditions ensure atomic swaps — the NFT and payment either both transfer or neither does.

### Automated Relayer Service
A Node.js service using Viem WebSocket listeners monitors Ethereum deposits to Circle's CCTP bridge. On detection (after 3-block confirmation safety), it mints a bridge claim NFT on Stacks with the claim metadata encoded in the token URI.

\`\`\`ts
// Relayer core loop
watchContractEvent({
  address: CCTP_ADDRESS,
  abi: cctpAbi,
  eventName: 'DepositForBurn',
  onLogs: async (logs) => {
    await mintClaimNFT(logs[0])
  }
})
\`\`\`

### Dynamic Pricing Engine
A non-linear discount algorithm using square root curves — discounts are larger when more time remains (higher uncertainty) and compress as the bridge nears completion. This reflects real congestion and time-value economics.

### Full-Stack DApp
React frontend integrating both Ethereum (Wagmi) and Stacks (Connect) wallets simultaneously. Users see live claim status, marketplace listings, and pricing curves.

## Technical Challenges

**Dual-chain wallet UX** — Managing two wallet connections simultaneously (MetaMask for ETH, Leather for Stacks) without confusing users required careful state isolation and clear chain indicators.

**Relayer reliability** — WebSocket connections drop. Built exponential backoff retry logic with persistent queue so no deposits are missed during outages.

## Impact

- Transforms 15–20 min of dead waiting time into tradeable value
- Creates a new DeFi primitive: time-value markets for bridge claims
- Fully functional testnet deployment with end-to-end bridging flow
`,
    },
    {
      id: 3,
      title: 'ZK Parental Consent Gateway',
      slug: 'zk-consent-gateway',
      githubUrl: 'https://github.com/anynomousfriend/ZK-parental-consent',
      githubRepo: 'anynomousfriend/ZK-parental-consent',
      desc: 'Privacy-preserving DApp on Midnight Network — zero-knowledge proofs let parents grant/revoke consent for minors without exposing child identity. COPPA/GDPR compliant.',
      tags: ['TypeScript', 'React', 'Docker', 'Node.js'],
      visual: <ZKConsentVisual />,
      caseStudy: `# ZK Parental Consent Gateway

## The Problem

COPPA and GDPR-K require platforms to verify parental consent before collecting data from minors. Every existing solution requires platforms to store sensitive information about children — names, ages, parent emails. This creates massive data liability. A single breach exposes minors' personal data.

There's a fundamental question: **why does a platform need to know a child's identity in order to verify that a parent has consented?**

## The Solution

It doesn't. Zero-knowledge proofs let parents prove consent without revealing who the child is. The ZK Parental Consent Gateway stores only a cryptographic hash on-chain. Platforms verify proof of consent — they never learn the child's identity.

## What I Built

### ZK Smart Contracts (Compact)
Midnight Network's Compact language compiles to ZK circuits. The contract stores \`mapping(bytes32 childHash => bool consent)\`. Parents submit a commitment; the circuit proves they know the preimage without revealing it.

### Parent Dashboard
React interface where parents register their child (locally hashed, never transmitted in plaintext), grant or revoke consent per platform, and audit all consent history — all non-custodially.

### Child Verification Flow
Children generate a ZK proof client-side using their identity commitment. The proof is submitted to the platform's verifier endpoint. The platform confirms consent is active — without ever seeing the child's name or age.

### Local Development Environment
Docker Compose setup running the full Midnight stack: network node, indexer, and proof-server. Automated funding scripts and contract deployment via npm workflows.

\`\`\`bash
docker compose up -d
npm run deploy:midnight
npm run fund:wallet
\`\`\`

## Technical Challenges

**ZK proof generation time** — Client-side proof generation took 3–8 seconds on mobile. Mitigated with a WebWorker-based proof queue and optimistic UI that shows a pending state while the proof computes.

**Midnight Network immaturity** — The network was pre-mainnet with sparse documentation. Had to reverse-engineer several SDK behaviours from source code and community Discord.

## Impact

- Platforms carry zero data liability for minor identity information
- Cryptographically verifiable consent — cannot be forged
- Fully private: platforms learn only "consent granted" or "consent denied"
- COPPA and GDPR-K compliant by design, not by policy
`,
    },
    {
      id: 4,
      title: 'ZenResume',
      slug: 'zen-resume',
      githubUrl: 'https://github.com/anynomousfriend/zen-resume',
      githubRepo: 'anynomousfriend/zen-resume',
      desc: 'AI-powered resume builder with automated certificate extraction from 10+ platforms (Coursera, Credly, LinkedIn), multi-format export (PDF, LaTeX, DOCX), and a Japanese Zen design system.',
      tags: ['Next.js', 'TypeScript', 'Tailwind', 'shadcn/ui'],
      visual: <ZenResumeVisual />,
      caseStudy: `# ZenResume

## The Problem

Building a professional resume is tedious. Manually copying certificate details from Coursera, Credly, LinkedIn Learning, and edX — getting the dates right, the credential IDs, the issuing organisations — takes hours. Most resume builders are cluttered, ugly, and export PDFs that look like they were made in 2009.

## The Solution

ZenResume automates the painful parts. Paste a certificate URL — the system fetches and parses all metadata automatically. The result is rendered in a beautiful Japanese-inspired design system that produces clean, ATS-optimised exports.

## What I Built

### Certificate Parser Engine
Platform-specific extractors for 10+ certificate providers. Each parser handles the platform's unique HTML structure, API endpoints, or metadata schemas:

| Platform | Method |
|---|---|
| Coursera | REST API + HTML fallback |
| Credly | Open Badges API |
| edX | Metadata scraping |
| LinkedIn Learning | OG tag extraction |
| Udemy | Structured data parsing |

### Multi-Format Export
- **PDF** — jsPDF with custom font embedding
- **LaTeX** — Template-based generation for academic applications
- **DOCX** — docx.js with style inheritance
- **HTML** — Standalone file with embedded CSS

### Zen Design System
Inspired by Japanese aesthetics — MA (negative space), KANSO (simplicity), SHIBUI (understated elegance). Custom colour palette: Washi (paper white), Sumi (ink black), Indigo, Vermilion. Anime.js animations for section transitions, glassmorphism card effects, dark mode.

### UX Details
- Drag-and-drop section reordering
- Floating label inputs with smooth transitions
- \`localStorage\` auto-save — never lose work
- Real-time preview — see changes instantly
- Mobile-first responsive layout

## Technical Challenges

**Platform anti-scraping** — Several platforms return bot-detection pages for server-side requests. Solved with browser-like request headers, rate limiting, and graceful fallbacks to manual entry.

**LaTeX character escaping** — User input containing \`&\`, \`%\`, \`$\` breaks LaTeX compilation. Built a sanitisation layer that escapes all special characters before template injection.

## Impact

- Reduces resume creation time by ~70%
- Certificate data verified and formatted automatically
- ATS-optimised output tested against major applicant tracking systems
- Production-ready with responsive mobile-first design
`,
    },
    {
      id: 5,
      title: 'LLM Chess Arena',
      slug: 'llm-chess-arena',
      githubUrl: 'https://github.com/anynomousfriend/LLM-Chess-Arena',
      githubRepo: 'anynomousfriend/LLM-Chess-Arena',
      desc: 'Experimental platform where 100+ LLM models (GPT-4, Claude, Llama, Mixtral) compete in chess matches — exposing AI reasoning through gameplay with real-time WebSocket updates.',
      tags: ['Python', 'React', 'TypeScript', 'Node.js'],
      visual: <LLMChessVisual />,
      caseStudy: `# LLM Chess Arena

## The Idea

Standard AI benchmarks test knowledge retrieval. Chess tests something different: **multi-step reasoning under constraints**. An LLM playing chess must parse board state from a text representation, understand legal moves, reason about consequences several moves ahead, and respond with a valid algebraic notation move — all in a single inference call.

I built LLM Chess Arena to compare how different models perform under this kind of structured reasoning challenge.

## What I Built

### Multi-Provider Integration
Integrated two API aggregators to access 100+ models:
- **Groq** — Ultra-fast inference for Llama, Mixtral, Gemma
- **OpenRouter** — GPT-4, Claude, Gemini, and hundreds of others

Each provider has different rate limits, response formats, and error behaviours. Built a unified adapter layer with per-provider retry logic and exponential backoff.

### Chess Engine
- **python-chess** — Server-side move validation. Every model response is validated before being applied. Invalid moves trigger a retry with an error prompt, then graceful resignation after 3 failures.
- **chess.js** — Client-side validation for instant UI feedback without round-tripping the server.

### Real-Time Architecture
Flask-SocketIO WebSocket server pushes board state updates to connected clients after each move. Auto-play mode streams a full game with configurable delays between moves.

\`\`\`python
@socketio.on('make_move')
def handle_move(data):
    move = get_llm_move(data['model'], data['fen'])
    if chess.Move.from_uci(move) in board.legal_moves:
        board.push_uci(move)
        emit('board_update', {'fen': board.fen()})
\`\`\`

### Analytics
- Material advantage tracking per move
- PGN export for game replay
- Move history with timestamps
- Win/loss/draw statistics per model

## Interesting Findings

- Larger models play more consistently but aren't always stronger
- Models often make tactically weak moves when the board description is complex
- Prompt engineering significantly affects move quality — "think step by step" improves play noticeably
- Some models refuse to play certain positions, citing ethical concerns about "aggressive" moves

## Technical Challenges

**Invalid move handling** — Models frequently output moves in wrong notation, illegal moves, or plain English explanations. The retry system with structured error prompts reduced invalid move rates from ~40% to ~8%.

## Impact

- Novel framework for benchmarking LLM reasoning through gameplay
- Supports comparison across 100+ models simultaneously
- Educational tool for understanding AI strategic capabilities
`,
    },
    {
      id: 6,
      title: 'iExec Confidential iApp',
      slug: 'iexec-iapp',
      githubUrl: 'https://github.com/anynomousfriend/TheunshakableHand',
      githubRepo: 'anynomousfriend/TheunshakableHand',
      desc: 'Decentralized confidential computing application on iExec — TEE-based serverless execution with blockchain-verified privacy guarantees, deployed on Arbitrum Sepolia.',
      tags: ['TypeScript', 'Docker', 'Node.js'],
      visual: <IExecVisual />,
      caseStudy: `# iExec Confidential iApp

## The Problem

Traditional cloud computing requires trusting your provider with your data and code. AWS, Google Cloud, and Azure can theoretically access everything running on their infrastructure. For sensitive workloads — medical data processing, private key operations, proprietary algorithms — this trust assumption is unacceptable.

## The Solution

iExec's decentralised compute network uses **Trusted Execution Environments (TEEs)** — hardware-level secure enclaves (Intel SGX) where code runs in an encrypted memory region that even the host machine cannot read. The iApp is a containerised serverless function that runs inside a TEE, with execution verified on-chain via Arbitrum Sepolia.

## What I Built

### TEE Application Container
A Docker-based confidential computing application that runs in both Standard (development) and TEE (production) modes. The app follows iExec's strict I/O framework:

\`\`\`
/iexec_in/   — encrypted input data
/iexec_out/  — output directory (max 50MB)
/iexec_out/computed.json — required result manifest
\`\`\`

### Blockchain Payment Integration
The iExec SDK handles the full payment lifecycle: requester secrets, protected data access, app developer secrets, and workerpool order matching. Each execution is an on-chain transaction on Arbitrum Sepolia.

### Secret Management
Three tiers of secrets supported:
- **Requester secrets** — caller-provided sensitive inputs
- **Protected data** — encrypted datasets shared with the app
- **App secrets** — developer-configured environment secrets

\`\`\`ts
const taskId = await iexec.task.run({
  app: APP_ADDRESS,
  dataset: PROTECTED_DATA_ADDRESS,
  requesterSecrets: { apiKey: 'secret' },
  workerpool: 'public.pools.iexec.eth',
})
\`\`\`

### Deployment Pipeline
Automated scripts for app registration, TEE framework configuration (Scone), order signing, and public workerpool submission. The full deploy-to-run cycle is a single \`npm run deploy\` command.

## Technical Challenges

**TEE attestation** — The Scone framework requires the Docker image to be built with specific base images and signing keys. Debugging inside an encrypted enclave is extremely limited — had to rely on output logs exclusively.

**Result size constraints** — The 50MB output limit required careful output compression and chunked result strategies for data-heavy workloads.

## Impact

- Privacy-guaranteed serverless execution — even iExec cannot read your data
- Decentralised alternative to AWS Lambda with cryptographic privacy proofs
- Production deployment on Arbitrum Sepolia with public workerpool
`,
    },
  ],
};
