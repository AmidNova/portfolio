/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const GITHUB_USER = "AmidNova";
const GITHUB_TIMEOUT_MS = 5000;

/**
 * Public repo count for the "N+ projects" tile. Builds only; any failure
 * (offline, rate limit) leaves the value unset and the site keeps its
 * last known count. GITHUB_TOKEN, when present (CI), avoids the rate limit.
 */
async function fetchPublicRepoCount(): Promise<string | undefined> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      signal: AbortSignal.timeout(GITHUB_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const { public_repos } = (await res.json()) as { public_repos?: unknown };
    return typeof public_repos === "number" ? String(public_repos) : undefined;
  } catch (error) {
    console.warn(`[repo count] kept the fallback: ${(error as Error).message}`);
    return undefined;
  }
}

export default defineConfig(async ({ command }) => {
  const repoCount =
    command === "build" ? await fetchPublicRepoCount() : undefined;
  return {
    plugins: [react(), tailwindcss()],
    define: repoCount
      ? { "import.meta.env.VITE_GITHUB_REPOS": JSON.stringify(repoCount) }
      : {},
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      globals: true,
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      exclude: ["everything-claude-code/**", "node_modules/**", "dist/**"],
    },
  };
});
