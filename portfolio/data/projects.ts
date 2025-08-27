const API_BASE_URL = process.env.NEXT_PUBLIC_DB_CONNECTION || "";

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

export default async function getAboutMeInfo(): Promise<AboutInfo[]> {
  const aboutMe = await fetch(`${API_BASE_URL}/about`, {
    cache: "no-store",
  });
  return aboutMe.json();
}
