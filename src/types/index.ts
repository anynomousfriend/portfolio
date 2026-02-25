import type { ReactNode } from 'react';

export type Position = {
  x: number;
  y: number;
};

export type RobotExpression =
  | 'idle'
  | 'run'
  | 'sleep'
  | 'happy'
  | 'excited'
  | 'music'
  | 'confused'
  | 'love'
  | 'love-overload'
  | 'dizzy'
  | 'focused'
  | 'dance'
  | 'peek'
  | 'starry'
  | 'yawn'
  | 'shy'
  | 'night'
  | 'sneeze'
  | 'highfive'
  | 'bubble';

export type BubbleData = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export type WorkMode = 'none' | 'commuting' | 'arrived' | 'working';
export type WorkAction = 'none' | 'waving' | 'typing' | 'pointing' | 'highfive';

export type SkillData = {
  title: string;
  desc: string;
  icon: ReactNode;
  size: string;
  renderVisual: (inView: boolean, mousePos: { x: number; y: number }) => ReactNode;
};

export type ProjectData = {
  id: number;
  featured?: boolean;
  title: string;
  desc: string;
  tags: string[];
  visual: ReactNode;
  coverImage?: string;
  slug?: string;
  githubUrl?: string;
  githubRepo?: string; // 'owner/repo' for README fetching
  liveUrl?: string;
  caseStudy?: string;
};

export type ProjectCategory = 'design' | 'dev';

export type ExperienceData = {
  company: string;
  role: string;
  period: string;
  location?: string;
  logo?: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
};

export type CertificateData = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  url?: string;
};
