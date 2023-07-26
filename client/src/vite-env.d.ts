/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PATH: string;
  readonly VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
