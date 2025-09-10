import { AboutInfo, IProject } from "@/types/types";
import { serverEnv } from "@/config/env";

const API_BASE_URL = serverEnv.PUBLIC_DB_CONNECTION;

export async function getAboutMeInfo(): Promise<AboutInfo[]> {
  const aboutMe = await fetch(`${API_BASE_URL}/about`, {
    cache: "no-store",
  });
  return aboutMe.json();
}

export async function getProjects(): Promise<IProject[]> {
  const projects = await fetch(`${API_BASE_URL}/projects`, {
    cache: "no-store",
  });
  return projects.json();
}
