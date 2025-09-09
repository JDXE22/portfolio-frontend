import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";
import { loadEnv } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    resolve: {
      alias: { "@": root },
    },
    plugins: [tsconfigPaths(), react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./tests/testSetup.ts"],
      include: ["**/*.test.{ts,tsx}"],
      css: false,
      env: {
        ...env,
      },
      testTimeout: 20_000,
      hookTimeout: 20_000,
    },
  };
});
