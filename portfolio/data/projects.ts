import { AboutInfo } from "@/types/types";
const API_BASE_URL = process.env.NEXT_PUBLIC_DB_CONNECTION || "";

export default async function getAboutMeInfo(): Promise<AboutInfo[]> {
  const aboutMe = await fetch(`${API_BASE_URL}/about`, {
    cache: "no-store",
  });
  return aboutMe.json();
}
