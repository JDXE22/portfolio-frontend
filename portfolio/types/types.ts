export type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

export interface AboutInfo {
  headline: string;
  bio: string;
  avatarIconUrl: string;
  skills: string[];
  techStack: string[];
  experience?: { title: string; company: string; duration: string }[];
  education: string[];
  certifications?: { title: string; issuer: string; date: string }[];
  socialLinks: string[];
}
