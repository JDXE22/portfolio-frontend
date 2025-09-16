import { AboutInfo, IProject } from "@/types/types";
import { serverEnv } from "@/config/env";

const API_BASE_URL = serverEnv.PUBLIC_DB_CONNECTION;

async function jsonOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => ``);
    throw new Error(
      `Request failed (${response.status}): ${response.statusText}${
        errorText ? ` - ${errorText}` : ""
      }`
    );
  }
  return (await response.json()) as T;
}

export async function getAboutMeInfo(): Promise<AboutInfo[]> {
  if (!API_BASE_URL) return [];

  try {
    const aboutMe = await fetch(`${API_BASE_URL}/about`, {
      cache: "no-store",
    });
    return await jsonOrThrow<AboutInfo[]>(aboutMe);
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<IProject[]> {
  if (!API_BASE_URL) return [];

  try {
    const projects = await fetch(`${API_BASE_URL}/projects`, {
      cache: "no-store",
    });
    return await jsonOrThrow<IProject[]>(projects);
  } catch {
    return [];
  }
}

export async function sendContactForm(formData: FormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      body: formData,
    });
    return await jsonOrThrow<{ message: string }>(response);
  } catch {
    return [];
  }
}
