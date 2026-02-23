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

export const metadata: Metadata = {
  title: "Subhankar — Blockchain & Full-Stack Engineer",
  description:
    "Portfolio of Subhankar — Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.",
  openGraph: {
    title: "Subhankar — Blockchain & Full-Stack Engineer",
    description:
      "Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhankar — Blockchain & Full-Stack Engineer",
    description:
      "Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.",
    creator: "@SsubhankarX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hankenGrotesk.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <RobotCompanion />
      </body>
    </html>
  );
}
