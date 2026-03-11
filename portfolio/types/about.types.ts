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

export type KnowledgeLevel =
  | 'Foundational'
  | 'Intermediate'
  | 'Advanced'
  | 'Expert';

export interface AboutInfo {
  id?: string;
  headline: string;
  bio: string;
  avatarIconUrl: string;
  techSkills: Array<{
    name: string;
    level: KnowledgeLevel;
  }>;
  softSkills?: string[];
  socialLinks?: SocialLink[];
}
