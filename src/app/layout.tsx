import type { Metadata } from "next";
import { Hanken_Grotesk, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RobotCompanion } from "@/components/robot/robot-companion";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
});

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://subhankarchoudhury.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Subhankar — Blockchain & Full-Stack Engineer",
  description:
    "Portfolio of Subhankar — Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.",
  openGraph: {
    title: "Subhankar — Blockchain & Full-Stack Engineer",
    description:
      "Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.",
    type: "website",
    url: siteUrl,
    siteName: "Subhankar's Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Subhankar — Blockchain & Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhankar — Blockchain & Full-Stack Engineer",
    description:
      "Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.",
    creator: "@SsubhankarX",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Subhankar Choudhury",
  url: siteUrl,
  jobTitle: "Blockchain & Full-Stack Engineer",
  description:
    "Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.",
  sameAs: [
    "https://github.com/subhankarchoudhury",
    "https://twitter.com/SsubhankarX",
    "https://linkedin.com/in/subhankar-choudhury",
  ],
  knowsAbout: [
    "Blockchain",
    "Web3",
    "Solidity",
    "React",
    "Next.js",
    "TypeScript",
    "DeFi",
    "Zero Knowledge Proofs",
    "Full-Stack Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${hankenGrotesk.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
          <RobotCompanion />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
