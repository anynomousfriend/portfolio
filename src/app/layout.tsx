import type { Metadata } from "next";
import { Hanken_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RobotCompanion } from "@/components/robot/robot-companion";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subhankar — Blockchain & Full-Stack Engineer",
  description:
    "Portfolio of Subhankar — Blockchain/Web3 engineer and design-focused full-stack developer building at the intersection of DeFi, privacy tech, and beautiful UI/UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hankenGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <RobotCompanion />
      </body>
    </html>
  );
}
