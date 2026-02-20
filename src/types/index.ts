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
  | 'highfive';

export type WorkMode = 'none' | 'commuting' | 'arrived' | 'working';
export type WorkAction = 'none' | 'waving' | 'typing' | 'pointing' | 'highfive';

export type SkillData = {
  title: string;
  desc: string;
  icon: ReactNode;
  size: string;
  renderVisual: (inView: boolean) => ReactNode;
};

export type ProjectData = {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  visual: ReactNode;
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
  description: string;
  technologies: string[];
};
