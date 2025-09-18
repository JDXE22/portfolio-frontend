export const serverEnv = {
  PUBLIC_DB_CONNECTION: process.env.PUBLIC_DB_CONNECTION ?? ``,
} as const;

export const publicEnv = {
  NEXT_PUBLIC_DB_CONNECTION:
    process.env.NEXT_PUBLIC_DB_CONNECTION ?? process.env.PUBLIC_DB_CONNECTION,
} as const;
