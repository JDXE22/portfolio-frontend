import { AboutInfo, IProject, TechStack } from '@/types/types';
import { serverEnv, publicEnv } from '@/config/env';

const API_BASE_URL =
  typeof window === 'undefined'
    ? serverEnv.PUBLIC_DB_CONNECTION
    : publicEnv.NEXT_PUBLIC_DB_CONNECTION;

async function jsonOrThrow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => ``);
    throw new Error(
      `Request failed (${response.status}): ${response.statusText}${
        errorText ? ` - ${errorText}` : ''
      }`,
    );
  }
  return (await response.json()) as T;
}

export async function getAboutMeInfo(): Promise<AboutInfo[]> {
  if (!API_BASE_URL) return [];

  try {
    const aboutMe = await fetch(`${API_BASE_URL}/about`, {
      next: { revalidate: 300 },
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
      next: { revalidate: 300 },
    });
    return await jsonOrThrow<IProject[]>(projects);
  } catch {
    return [];
  }
}

export async function sendContactForm(
  formData: FormData,
): Promise<{ message?: string }> {
  if (!API_BASE_URL) {
    throw new Error('Missing API base URL');
  }
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    body: formData,
  });
  return jsonOrThrow<{ message?: string }>(response);
}

export async function getTechStack(): Promise<TechStack[]> {
  if (!API_BASE_URL) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/stack`, {
      next: { revalidate: 300 },
    });
    return await jsonOrThrow<TechStack[]>(response);
  } catch {
    return [];
  }
}
