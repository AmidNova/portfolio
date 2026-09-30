/// <reference types="vite/client" />

declare module '*.JPEG' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  /** Public repo count, injected by vite.config.ts at build time. */
  readonly VITE_GITHUB_REPOS?: string;
}
