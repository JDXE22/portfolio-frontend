import React from 'react';

export type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  noPadding?: boolean;
  noMinHeight?: boolean;
  equalHeight?: boolean;
  customMinHeight?: string;
};

export interface SocialLink {
  name?: string;
  url?: string;
  username?: string;
  iconPublicId?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration?: string;
  iconPublicId?: string;
}

export interface AboutInfo {
  id: string;
  headline: string;
  bio: string;
  avatarIconUrl: string;
  skills: string[];
  socialLinks: SocialLink[];
}

export type LiveStatus =
  | 'Live'
  | 'Maintenance'
  | 'Down'
  | 'Development'
  | 'Planned';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type IProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  imgUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  liveStatus: LiveStatus;
  difficultyLevel: DifficultyLevel;
  reasoning: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  showCloseButton?: boolean;
};

export type ClassValue = string | false | null | undefined;

export type Props = { projects: ReadonlyArray<IProject> };

export type SmoothScrollOptions = {
  duration?: number;
  offset?: number;
};

// TechStack Types

type StackCategory =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'tooling'
  | 'security'
  | 'language';

export type TechStack = {
  name: string;
  iconPublicId: string;
  category: StackCategory;
};
