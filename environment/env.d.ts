interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_API_DELAY: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}