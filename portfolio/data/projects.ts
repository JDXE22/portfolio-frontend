import { AboutInfo } from "@/types/types";
import { serverEnv } from "@/config/env";

const API_BASE_URL = serverEnv.PUBLIC_DB_CONNECTION;

export default async function getAboutMeInfo(): Promise<AboutInfo[]> {
  const aboutMe = await fetch(`${API_BASE_URL}/about`, {
    cache: "no-store",
  });
  return aboutMe.json();
}
